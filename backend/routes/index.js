const express = require("express");
const Order = require("../models/order");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder where the file will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

const routes = (app) => {
  const router = express.Router();

  router.post('/upload', upload.single('csv'), async (req, res) => {
      if (!req.file) {
        // No file was uploaded
        return res.status(400).json({ error: 'No file uploaded' });
      }
    
      const errors = []; // Store validation errors
    
      // Check if the uploaded file is a CSV
      if (req.file.mimetype !== 'text/csv') {
        errors.push('Invalid file format. Please upload a CSV file.');
      }
    
      // Validate the CSV file contents
      const results = [];
    
      let hasEntries = false; // Flag to check if the CSV has any entries
    
      try {
        const stream = fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (data) => {
            hasEntries = true; // Set the flag to true
    
            // Process each row of the CSV file
            const modelNumber = String(data['Model Number']);
            const unitPrice = parseFloat(data['Unit Price']);
            const quantity = parseInt(data['Quantity']);
    
            // Perform validation checks for each field
            if (!modelNumber || !modelNumber.trim()) {
              errors.push('Missing or invalid Model Number in CSV.');
            }
            if (isNaN(unitPrice) || unitPrice <= 0) {
              errors.push('Missing or invalid Unit Price in CSV.');
            }
            if (isNaN(quantity) || quantity <= 0) {
              errors.push('Missing or invalid Quantity in CSV.');
            }
    
            if (errors.length === 0) {
              // Create a new Order instance
              const order = new Order({
                date: req.body.date,
                vendor: req.body.vendor,
                modelNumber,
                unitPrice,
                quantity
              });
    
              results.push(order);
            }
          })
          .on('end', async () => {
            // Remove the temporary uploaded file
            fs.unlinkSync(req.file.path);
    
            if (!hasEntries) {
              // CSV has no entries
              errors.push('CSV file has no entries.');
            }
    
            if (errors.length > 0) {
              // Return validation errors to the frontend
              return res.status(400).json({ errors });
            }
    
            try {
              // Save all the validated orders to the database
              const savedOrders = await Order.insertMany(results);
              return res.status(200).json({ message: 'File uploaded successfully', data: savedOrders });
            } catch (error) {
              console.error('Error saving orders to the database:', error);
              return res.status(500).json({ error: 'Error saving orders to the database.' });
            }
          })
          .on('error', (error) => {
            console.error('Error processing CSV:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          });
      } catch (error) {
        console.error('Error processing CSV:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
  
  //Route to get all orders
  router.get("/orders", async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
  });

  //Route to Post an order
  router.post("/orders", async (req, res) => {
    const { date, vendor, modelNumber, unitPrice, quantity } = req.body;
    const order = new Order({ date, vendor, modelNumber, unitPrice, quantity });
    const savedOrder = await order.save();
    res.json(savedOrder);
  });

  router.delete("/orders/:id", async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndRemove(req.params.id);
      if (deletedOrder) {
        return res.status(204).json({ message: `Order ${req.params.id} is deleted successfully.` });
      } else {
        return res.status(404).json({ message: `Order ${req.params.id} not found.` });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error deleting order.", error });
    }
  });

  app.use("/api", router);
};

module.exports = routes;

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

  app.post('/api/upload', upload.single('csv'), async (req, res) => {
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
  
    try {
      const stream = fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', async (data) => {
          // Process each row of the CSV file
          const modelNumber = String(data['Model Number']);
          const unitPrice = parseFloat(data['Unit Price']);
          const quantity = parseInt(data['Quantity']);
  
          // Perform validation checks for each field
          if (!modelNumber || !modelNumber.trim()) {
            errors.push('Missing or empty Model Number.');
          }
          if (isNaN(unitPrice) || unitPrice <= 0) {
            errors.push('Invalid Unit Price.');
          }
          if (isNaN(quantity) || quantity <= 0) {
            errors.push('Invalid Quantity.');
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
  
            try {
              // Save the order to the database
              const savedOrder = await order.save();
              results.push(savedOrder);
            } catch (error) {
              // Handle database save error
              console.error('Error saving order to the database:', error);
              errors.push('Error saving order to the database.');
            }
          }
        });
  
      await new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Remove the temporary uploaded file
      fs.unlinkSync(req.file.path);
    }
  
    if (errors.length > 0) {
      // Return validation errors to the frontend
      return res.status(400).json({ errors });
    }
  
    // Return a response indicating successful upload and processed data
    return res.status(200).json({ message: 'File uploaded successfully', data: results });
  });

  router.get("/orders", async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
  });

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

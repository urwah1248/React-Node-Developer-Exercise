const multer = require("multer");
const {
    addOrder,
    deleteOrder,
    bulkUploader,
    getOrders
} = require('./controllers/ordersController')

const router = require('express').Router()

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

router.get("/orders", getOrders)
router.delete("/orders/:id", deleteOrder)
router.post("/orders", addOrder)
router.post('/upload', upload.single('csv'), bulkUploader)

module.exports = router
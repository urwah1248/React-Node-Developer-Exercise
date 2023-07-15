const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  date:{
    type: Date,
    required: true
  },
  vendor:{
    type: String,
    required: true
  },
  modelNumber: {
    type: String,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
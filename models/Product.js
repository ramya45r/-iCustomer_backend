const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  dataCategory: String,
  productName:String,
  recordCount: Number,
  fields: [String],
 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

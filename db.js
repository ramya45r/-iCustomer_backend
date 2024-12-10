require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product'); 

mongoose.connect(process.env.mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});
connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

const productsData = [
  {
    id: 1,
    productName: "Smartphone",
    dataCategory: "Electronics",
    recordCount: 100,
    fields: ["Name", "Price", "Brand"],
   
  },
  {
    id: 2,
    dataCategory: "Home Appliances",
    productName: "Refrigerator",
    recordCount: 50,
    fields: ["Name", "Price", "Brand"],
    
  },
  {
    id: 3,
    dataCategory: "Gaming",
    productName: "Gaming Console",

    recordCount: 75,
    fields: ["Name", "Price", "Brand"],
   
  }
];

const insertProducts = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productsData);
    console.log("Products data has been added successfully!");

    // mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting products data:", error);
    // mongoose.connection.close();
  }
};

insertProducts();

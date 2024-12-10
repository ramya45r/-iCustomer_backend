const Product = require('../models/Product');
const data=require('../data/products.json');
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id: parseInt(id) });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a New Product
const addProduct = async (req, res) => {
    const { id, dataCategory, recordCount, fields } = req.body;

    try {
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this ID already exists' });
        }

        const newProduct = new Product({
            id,
            dataCategory,
            recordCount,
            fields,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getProductById,
    getAllProducts,
    addProduct
};

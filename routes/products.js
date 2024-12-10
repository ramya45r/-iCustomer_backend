// routes/productRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { getProductById, getAllProducts, addProduct } = require('../controller/productController');

const router = express.Router();
const SECRET = 'supersecretkey';

// Middleware for Authentication
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// Define the routes and use the controller functions
router.get('/:id', authenticate, getProductById);  // Use the controller function
router.get('/alldata/all', authenticate, getAllProducts);  // Use the controller function
router.post('/', authenticate, addProduct);  // Use the controller function

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { config } = require('dotenv');
const app = express();
const PORT = 4000;
config();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});

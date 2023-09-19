const express = require('express')
const productsController = require('../controller/productsController');
const router = express.Router();
//Defining routes
router.get('/api/products', productsController.getProducts)

module.exports = router;

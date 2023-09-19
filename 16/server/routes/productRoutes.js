const express = require('express')
const router=express.Router();
const {getProductRevenue, getTopSellingProduct} = require('../controllers/productController')

router.get('/product-revenue', getProductRevenue)
router.get('/top-selling-product',getTopSellingProduct);

module.exports=router;

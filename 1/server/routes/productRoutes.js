//Defining express module and configuring router
const express = require('express')
const router = express.Router();
//importing getProducts
const getProducts = require("../controller/productController")

//Define get routes
router.get('/products',getProducts);
module.exports=router;

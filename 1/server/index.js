//Defining modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//importing routes
const productRoutes = require('./routes/productRoutes')
//config dotenv
dotenv.config();
//config express app
const app = express();
// Defining static variable
const PORT = process.env.PORT || 5000
/**
 * @description Fetching fakestore api for getting product data
 * @author Chanchal Verma 
 */
//Configure the middleware
app.use(express.json());
app.use(cors());
//use the product routes
app.use('/',productRoutes);
app.listen(PORT,()=>{
    console.log(`Server  is running on port ${PORT}`)
})
//Defining modules
const express=require("express")
const cors=require('cors');
const dotenv=require('dotenv')
//importing routes
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
//configure the dotenv file
dotenv.config();
//configure express app
const app=express();
//Defining static variable
const PORT = process.env.PORT||5000

  //middleware
  app.use(express.json());
  app.use(cors());

  //use routes
  app.use('/api', productRoutes)
  app.use('/api',categoryRoutes)
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  })
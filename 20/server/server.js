//Defining module
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//config dotenv
dotenv.config();

//import Routes
const taskRoute = require('./routes/taskRoute')
/**
 * @description Fetching the api for apply searching functionality
 * @author Chanchal Verma 
 */
//Defining port
const PORT = process.env.PORT || 5000
//configuring app
const app = express();

//Using routes
app.use('/',taskRoute);

//Configuring middleware
app.use(express.json());
app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

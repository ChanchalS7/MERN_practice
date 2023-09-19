// //Defining modules
// const express = require("express");
// const axios = require('axios');
// const cors = require('cors');
// const dotenv = require('dotenv');
// /**
//  * @description Fetching fakestore API using axios to apply some query params.
//  * @author Chanchal Verma
//  */
// //Defining static variable 
// const PORT = process.env.PORT || 5000
// const API=process.env.API
// //config dotenv file
// dotenv.config();
// //configuring app
// const app=express();
// //Configuring middleware
// app.use(express.json());
// app.use(cors());
// //GET method to get data and use axios
// app.get('/api/products/', async (req,res)=>{
//     try{
//         let {id, count} = req.query;
//         id=parseInt(id);
//         count=parseInt(count);

//         if(isNaN(id) || isNaN(count) || id < 0 || count <=0){
//             return res.status(400).json({error:'Invalid id or count'})
//         }
//         const productData = await axios.get('API');
//         const resultData = productData.data;

//         if(id>=0 && count <= 20) {
//             const lowerLimit = id -1;
//             const upperLimit = lowerLimit + count;
//             const filteredData = resultData.slice(lowerLimit, upperLimit);
//             console.log(`Filtered Data: ${filteredData}`);
//             return res.status(200).json(filteredData);
//         }


//     }catch(error){
//         console.error('Error in getting products:', error);
//         return res.status(500).json({error:error.message})
//     }
// })
// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })


const app=require('./app')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT ||5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
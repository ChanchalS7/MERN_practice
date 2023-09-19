//Defining axios module
const axios = require('axios')

//function for getting data from api using axios

const getProducts = async(req,res)=>{
    try{
        const response = await axios.get('https://fakestoreapi.com/products')
        const products = response.data;
        res.json(products)

    }catch(error){
        console.error('Error in getting data',error);
    }
}
//Export controller function as default function
module.exports=getProducts;
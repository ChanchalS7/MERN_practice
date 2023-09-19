const axios = require('axios');
const fetchProducts = async (id,count) =>{
    try{
        let params = {id,count};
        const response = await axios.get('https://fakestoreapi.com/products')
        return response.data;

    }catch(error){
        throw error;

    }
}

module.exports={fetchProducts,}
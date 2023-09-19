const productService = require('../services/productService')

const getProducts = async (req,res) =>{
    try {
        let {id, count} = req.query;
        id=parseInt(id);
        count=parseInt(count);

        
        if(isNaN(id) || isNaN(count) || id < 0 || count <=0){
            return res.status(400).json({error:'Invalid id or count'})
        }
        const resultData = await productService.fetchProducts(id,count);

        if(id >=0 && count <=20) {
            const lowerLimit = id -1;
            const upperLimit = lowerLimit + count;
            const filteredData = resultData.slice(lowerLimit, upperLimit);
            return res.status(200).json(filteredData);
        }
        return res.status(200).json(resultData);
        
    } catch (error) {
        console.error('Error in getting products:',error);
        return res.status(500).json({error:'Internal server error'});

    }

}
module.exports={
    getProducts,
}

const {calculateProductRevenue} = require('../utils/calculateRevenue')
const {findTopSellingProduct} = require('../utils/findTopSelling')

//Get total revenue for each product
const getProductRevenue = (req,res)=>{
    const productRevenue=calculateProductRevenue();
    res.json(productRevenue);
}

//Get the top-selling product
const getTopSellingProduct = (req,res)=>{
    const topSellingProduct = findTopSellingProduct();
    res.json(topSellingProduct);
}

module.exports={
    getProductRevenue,
    getTopSellingProduct,

};

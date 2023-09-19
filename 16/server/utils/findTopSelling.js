const {calculateProductRevenue, calculateCategoryRevenue}  = require('./calculateRevenue')
//find top selling product
const findTopSellingProduct = ()=>{
    const productRevenue=calculateProductRevenue();
    productRevenue.sort((a,b)=>b.revenue-a.revenue)// sort in descending order
    return productRevenue[0];
}
//top selling category
const findTopSellingCategory= ()=>{
    const categoryRevenue=calculateCategoryRevenue();
    const topSellingCategory=Object.keys(categoryRevenue).reduceRight((a,b)=>categoryRevenue[a] > categoryRevenue[b] ? a : b);
    return topSellingCategory;
}

module.exports={
    findTopSellingCategory,
    findTopSellingProduct,
}
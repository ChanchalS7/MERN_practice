const data = require('../data/sampleData');

const calculateProductRevenue = ()=>{
    const productRevenue=[];
    data.categories.forEach((category)=>{
        category.subcategories.forEach((subcategory)=>{
            subcategory.products.forEach((product)=>{
                const orders = product.orders || [];
                let totalRevenue=0;
                orders.forEach((order)=>{
                    totalRevenue += order.quantity * product.price;
                });
                productRevenue.push({
                    productName:product.name,
                    quantity:orders.length,
                    revenue:totalRevenue.toFixed(2),
                });
            });
        });
    });
    return productRevenue;
}
const calculateCategoryRevenue = ()=>{
    const categoryRevenue={};
    data.categories.forEach((category)=>{
        categoryRevenue[category.name]=0;
        category.subcategories.forEach((subcategory)=>{
            subcategory.products.forEach((product)=>{
                const orders = product.orders || [];
                orders.forEach((order)=>{
                    categoryRevenue[category.name] += order.quantity * product.price;
                })
            })
        })
    })
    return categoryRevenue;
}
module.exports = {
    calculateProductRevenue,
    calculateCategoryRevenue,
};
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const data = require('./data.json');


app.get('/api/productName/:productName', (req,res)=>{
    const productName = req.params.productName;
    const product = findProductByName(productName);
    if(product){
       const response = {
        id:product.id,
        name:product.name,
        price:product.price,
        category:product.category,
        orders:findOrdersByProductId(product.id).map((order)=>({
            id:order.id,
            quantity:findOrderQuantity(order.id),
            customer:findCustomerName(order.id)
        }))
       };
       res.json(response);
    }else{
        res.status(404).json({message:'Product not found'})
    }
})

const findProductByName = (productName)=>{
    const {products} = data.marketplace
    return products.find(product=>product.name === productName)
}
const findOrdersByProductId = (productId) =>{
    const {orders} = data.marketplace;
    return orders.filter(order => order.products.some(item => item.productId === productId));
}
const findOrderQuantity =(orderId)=>{
    const {orders} = data.marketplace;
    const order = orders.find((order) =>order.id === orderId);
    if(order){
        return order.products.reduceRight((total, item)=>total + item.quantity,0);
    }
    return 0;
}
const findCustomerName = (orderId)=>{
    const {orders, customers} = data.marketplace;
    const order = orders.find((order)=>order.id == orderId);
    if(order){
        const customerId = order.customerId;
        const customer = customers.find((customer)=> customer.id === customerId)
        if(customer){
            return customer.name;
        }
    }
    return 'Unknown';
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
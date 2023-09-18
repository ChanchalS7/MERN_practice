const express=require("express")
const cors=require('cors');
const dotenv=require('dotenv')
dotenv.config();
const app=express();
const PORT = process.env.PORT||5000
const data={
    "categories": [
      {
        "name": "Electronics",
        "subcategories": [
          {
            "name": "Phones",
            "products": [
              {
                "name": "iPhone 13",
                "price": 999.99,
                "orders": [
                  {
                    "orderNumber": "ORD001",
                    "quantity": 2,
                    "customer": "Customer1"
                  },
                  {
                    "orderNumber": "ORD002",
                    "quantity": 1,
                    "customer": "Customer2"
                  }
                ]
              },
              {
                "name": "Samsung Galaxy S21",
                "price": 799.99,
                "orders": [
                  {
                    "orderNumber": "ORD003",
                    "quantity": 3,
                    "customer": "Customer3"
                  }
                ]
              }
            ]
          },
          {
            "name": "Laptops",
            "products": [
              {
                "name": "MacBook Pro",
                "price": 1299.99,
                "orders": [
                  {
                    "orderNumber": "ORD004",
                    "quantity": 1,
                    "customer": "Customer4"
                  }
                ]
              },
              {
                "name": "Dell XPS 15",
                "price": 1199.99,
                "orders": []
              }
            ]
          }
        ]
      },
      {
        "name": "Clothing",
        "subcategories": [
          {
            "name": "Men's",
            "products": [
              {
                "name": "Men's Shirt",
                "price": 29.99,
                "orders": [
                  {
                    "orderNumber": "ORD005",
                    "quantity": 5,
                    "customer": "Customer5"
                  }
                ]
              }
            ]
          },
          {
            "name": "Women's",
            "products": [
              {
                "name": "Women's Dress",
                "price": 49.99,
                "orders": [
                  {
                    "orderNumber": "ORD006",
                    "quantity": 2,
                    "customer": "Customer6"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  //middleware
  app.use(express.json());
  app.use(cors());

  //calculate total revenue
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
  //calculate total revenue for each categories
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
//API endpoint to get total revenue for each product
  app.get('/api/product-revenue',(req,res)=>{
    const productRevenue=calculateProductRevenue();
    res.json(productRevenue);
  })
  //API endpoint to get total revenue for each category
  app.get('/api/category-revenue',(req,res)=>{
    const categoryRevenue = calculateCategoryRevenue();
    res.json(categoryRevenue);
  })
  //API endpoint to get the top-selling product
  app.get("/api/top-selling-product",(req,res)=>{
    const topSellingProduct = findTopSellingProduct();
    res.json(topSellingProduct);
  })
  app.get('/api/top-selling-category',(req,res)=>{
    const topSellingCategory=findTopSellingCategory();
    res.json(topSellingCategory)
  })
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  })
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
  module.exports=data;
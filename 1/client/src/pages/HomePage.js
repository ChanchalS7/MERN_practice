import React, {useState, useEffect, useCallBack} from "react";

import './HomePage.css'

import { fetchProducts } from "../config/api";

import ProductCard from "../components/ProductCard";

import FilterControls from "../components/FilterControls";

function HomePage(){
    const [products, setProducts] = useState([]);
    const [minRating,setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState('')
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetchProducts() //Use the fetchProducts function from api.js
        .then((response)=>{
            setProducts(response?.data);
        });
    },[])
//Filter products based on rating and max price
const filteredProducts = products?.filter(
    (product)=> 
    product?.rating.rate >= minRating && (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice))
);

//Memoize the addToCart function using useCallback
const addToCart = useCallBack((product)=>{
    setCart([...cart, product])
},[cart])

//Calculate the cart value
const calculateTotal = () =>{
    const total = cart.reduce((acc,product)=> acc + parseFloat(product.price),0);
    return total.toFixed(2);
}
return (
    <div className="HomePage">
        <h1>Product List</h1>
        <FilterControls
        minRating={minRating}
        maxPrice={maxPrice}
        setMinRating={setMinRating}
        setMaxPrice={setMaxPrice}

        />
        <div className="product-list">
            {
                filteredProducts.map((product)=>(
                    <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    />
                ))
            }

        </div>
    </div>

)
}
export default HomePage;
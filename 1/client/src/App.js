import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { fetchProduct } from './config/api';

function App() {
  const [products, setProducts] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProduct().then((response) => {
      setProducts(response?.data);
    });
  }, []);

  // Filter the products based on rating and max price
  const filteredProducts = products?.filter(
    (product) =>
      product?.rating.rate >= minRating &&
      (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice))
  );

  // Memoize the addToCart function using useCallback
  const addToCart = useCallback(
    (product) => {
      setCart([...cart, product]);
    },
    [cart]
  );

  // Calculate cart value
  const calculateTotal = () => {
    const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    return total.toFixed(2);
  };

  return (
    
       <div className="App">
      <header className="header">
        <h1>Product List</h1>
        <Link to="/cart" className="cart-btn">
           Cart Items : {cart.length}
        </Link>
      </header>
      <div className="filter-container">
        <div className="filter">
          <label className="filter-label">Filter by Minimum Rating:</label>
          <select
            className="filter-select"
            value={minRating}
            onChange={(e) => setMinRating(parseInt(e.target.value))}
          >
            {/* ... (options for rating) */}
            <option value={0}>No Minimum Rating</option>
              <option value={1}>⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <div className="filter">
          <label className="filter-label">Filter by Maximum Price:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-slider"
          />
          <span className="filter-slider-value">${maxPrice}</span>
        </div>
      </div>
      <div className="product-list-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} calculateTotal={calculateTotal} />} />
      </Routes>
    </div>
  );
}

export default App;

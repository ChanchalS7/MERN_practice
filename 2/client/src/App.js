import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import fetchProducts from './config/api';
function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [count, setCount] = useState("");

  useEffect(()=>{
    fetchProducts.get(`/products?id=${id}&count=${count}`)
    .then((response)=>setProducts(response.data))
    .catch((error)=>console.error("Error in fetching product",error))
  },[id,count])

  //function to handle form submission

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetchProducts.get(`/products?id=${id}&count=${count}`)
    .then((response)=>setProducts(response.data))
    .catch((error)=>console.error("Error in fetching product",error))

  }

  return (
    <>
    <h1>Products Card</h1>
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Count:
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </>
  );
}

export default App;

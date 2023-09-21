// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [productName, setProductName] = useState('');
//   const [productDetails, setProductDetails] = useState([]);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`http://localhost:5000/api/productName/${productName}`);
//       if (response.status === 200) {
//         setProductDetails(response.data.orders);
//         setError('');
//       } else {
//         setProductDetails([]);
//         setError('Product not found');
//       }
//     } catch (error) {
//       setProductDetails([]);
//       setError('Error fetching product data');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Product Lookup</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="productName">Enter Product Name :</label>
//         <input
//           type="text"
//           id="productName"
//           name="productName"
//           required
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <button type="submit">LookUp</button>
//       </form>

//       {error && <p>{error}</p>}

//       {productDetails.length > 0 && (
//         <div className='product-details'>
//           <h2>{productDetails.name}</h2>
//           <p>Price : {productDetails.price}</p>
//           <p>Category : {productDetails.category}</p>
//           {productDetails.map((order, index) => (
//             <div key={index} className='order'>
//               <h2>Orders :{index + 1}</h2>
//               <p>Quantity: {order.quantity}</p>
//               <p>Customer: {order.customer}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productResponse = await axios.get(`http://localhost:5000/api/productName/${productName}`);
      
      if (productResponse.status === 200) {
        setProductDetails(productResponse.data);
        setError('');
      } else {
        setProductDetails({});
        setError('Product not found');
      }
    } catch (error) {
      setProductDetails({});
      setError('Error fetching product data');
    }
  };

  return (
    <div className="App">
      <h1>Product Lookup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Enter Product Name :</label>
        <input
          type="text"
          id="productName"
          name="productName"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button type="submit">LookUp</button>
      </form>

      {error && <p>{error}</p>}

      {productDetails.name && (
        <div className='product-details'>
          <h2>{productDetails.name}</h2>
          <p>Price : {productDetails.price}</p>
          <p>Category : {productDetails.category}</p>
          {productDetails.orders.map((order, index) => (
            <div key={index} className='order'>
              <h2>Orders : {index + 1}</h2>
              <p>Quantity: {order.quantity}</p>
              <p>Customer: {order.customer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

// function Cart({cart,calculateTotal}){
//     return (
//         <div className="cart">
//             <h2>Cart</h2>
//             <ul>
//                 {cart.map((product)=>(
//                     <li key={product.id}>{product.title}</li>
                   

//                 ))}
//                 <p>Total :${calculateTotal}</p>
//             </ul>
//         </div>
//     )

// }
// export default Cart;
// Cart.js

import React from 'react';

function Cart({ cart }) {
  // Calculate the subtotal of items in the cart
  const calculateSubtotal = () => {
    return cart.reduce((subtotal, product) => {
      return subtotal + parseFloat(product.price);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <p>Subtotal: ${calculateSubtotal()}</p> {/* Display the subtotal */}
    </div>
  );
}

export default Cart;

import Cart from "../components/Cart";
function CartPage({cart,calculateTotal}){
return (
    <div className="CartPage">
        <h1>Cart</h1>
        <Cart cart={cart} calculateTotal={calculateTotal}/>
    </div>
)
}
export default CartPage;

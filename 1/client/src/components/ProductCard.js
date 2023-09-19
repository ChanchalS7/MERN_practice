function ProductCard({product, addToCart}){
    const {id, title, image, price, rating} = product;
    const renderStars=()=>{
        const stars=[];

        for(let i=0;i<rating.rate; i++){
            stars.push(<span key={i}>⭐</span>);
        }
        return stars;

    }
    return (
        <div className="product-card">
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p>Price: ${price}</p>
            <p>Rating : {rating.rate} {renderStars()}</p>
            <button onClick={()=>addToCart(product)}>Add to Cart</button>
        </div>
    )

}
export default ProductCard;
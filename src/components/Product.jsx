function Product({ id, image, title, price, description, onAddToCart }) {
  return (
    <article className="product">
      <img src={image} alt="Elegant dressed person" />
      <div className="product-content">
        <div>
          <h3 className="product-title">{title}</h3>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
        </div>
        <div className="product-actions">
          <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default Product;

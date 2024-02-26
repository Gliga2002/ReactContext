import { CartContext } from "../shop/shopping-cart-context";
import { useContext } from "react";

function Product({ id, image, title, price, description }) {
  const {addItemToCart} = useContext(CartContext);
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
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default Product;

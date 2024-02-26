import { DUMMY_PRODUCTS } from "../dummy-products";
import Product from "./Product";

function Shop() {
  return (
    <section className="shop">
      <h2>Elegant clothing for everyone</h2>
      <ul className="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Shop;

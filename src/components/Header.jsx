import { useRef } from "react";

import logoImg from "../../public/logo.png";
import CartModal from "./CartModal";
import { CartContext } from "../shop/shopping-cart-context";
import { useContext } from "react";

function Header() {
const {items} = useContext(CartContext);

  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  const itemsQuantity = items.length;

  let actions = <button>Close</button>;

  if (itemsQuantity > 0) {
    actions = <>
      <button>Close</button>
      <button>Checkout</button>
    </>
  }

  return (
   <>
   <CartModal 
      title="Your Cart"
      ref={modal}
      actions={actions}
   />
    <header className="main-header">
      <div className="main-title">
        <img src={logoImg} alt="Elegant woman" />
        <h1>Elegant context</h1>
      </div>
      <button onClick={handleOpenModal}>Cart ({itemsQuantity})</button>
    </header>
    </>
  );
}

export default Header;

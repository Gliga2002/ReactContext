import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Cart from "./Cart";

const CartModal = forwardRef(function CartModal({ title, onUpdateItemQuantity, items, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: function () {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="modal">
      <h2>{title}</h2>
      <Cart onUpdateItemQuantity={onUpdateItemQuantity} items={items} />
      <form method="dialog" className="modal-actions">
       {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;

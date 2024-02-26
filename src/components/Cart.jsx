function Cart({ onUpdateItemQuantity, items }) {

  let totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  totalPrice = totalPrice.toFixed(2);

  

  return (
    <div className="cart">
      <ul className="cart-items">
        {items.length === 0 && <p>No items in cart!</p>}
        {items.length > 0 && items.map((item) => {
          return (
            <li key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span>{item.name}</span>
                <span>{`($${item.price.toFixed(2)})`}</span>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                  -
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="cart-total-price">
        Cart Total: <span>${totalPrice}</span>
      </p>
    </div>
  );
}

export default Cart;

import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: (id) => {},
  updateItemQuantity: (id, amount) => {},
});

export default function CartContextProvider({children}) {
  const [items, setItems] = useState([]);

  function handleAddItem(id) {
    setItems((prevState) => {
      const updatedItems = [...prevState];

      const updateItemIndex = prevState.findIndex((item) => item.id === id);

      const updateItem = updatedItems[updateItemIndex];

      if (updateItem) {
        const newItem = {
          ...updateItem,
          quantity: updateItem.quantity + 1,
        };
        updatedItems[updateItemIndex] = newItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        const brandNewItem = {
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        };
        updatedItems.push(brandNewItem);
      }

      return updatedItems;
    });
  }

  function handleUpdateItemQuantity(id, amount) {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];

      const updatedItemIndex = updatedItems.findIndex((item) => item.id === id);

      const newToBeUpdatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      newToBeUpdatedItem.quantity += amount;

      if (newToBeUpdatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = newToBeUpdatedItem;
      }

      return updatedItems;
    });
  }

  const cartCtx = {
    items: items,
    addItemToCart:handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
  }

  return <CartContext.Provider value={cartCtx}>
    {children}
  </CartContext.Provider>;
}

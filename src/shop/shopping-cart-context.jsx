import { createContext, useReducer} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: (id) => {},
  updateItemQuantity: (id, amount) => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
      const updatedItems = [...state.items];

      const updateItemIndex = updatedItems.findIndex((item) => item.id === action.payload.id);

      const updateItem = updatedItems[updateItemIndex];

      if (updateItem) {
        const newItem = {
          ...updateItem,
          quantity: updateItem.quantity + 1,
        };
        updatedItems[updateItemIndex] = newItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
        const brandNewItem = {
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        };
        updatedItems.push(brandNewItem);
      }

      console.log(updatedItems);

      return {
        ...state,
        items : updatedItems
      }
  }

  if (action.type === 'UPDATE_ITEM_QUANTITY') {
      const updatedItems = [...state.items];

      const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.id);

      const newToBeUpdatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      newToBeUpdatedItem.quantity += action.payload.amount;

      if (newToBeUpdatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = newToBeUpdatedItem;
      }

      return {
        ...state,
        items : updatedItems
      }
  }
  return state;
}

export default function CartContextProvider({children}) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: []
  });

  function handleAddItem(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id
      }
    })
  }

  function handleUpdateItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: {
        id,
        amount
      }
    })
  }

  const cartCtx = {
    items: shoppingCartState.items,
    addItemToCart:handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
  }

  return <CartContext.Provider value={cartCtx}>
    {children}
  </CartContext.Provider>;
}

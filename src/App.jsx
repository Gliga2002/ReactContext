import { DUMMY_PRODUCTS } from "./dummy-products";

import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
import { useState } from "react";

function App() {
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
  return (
    <>
      <Header 
       onUpdateItemQuantity={handleUpdateItemQuantity} items={items} 
      />

      <Shop>
        {
          <ul className="products">
            {DUMMY_PRODUCTS.map((product) => (
              <li key={product.id}>
                <Product {...product} onAddToCart={handleAddItem} />
              </li>
            ))}
          </ul>
        }
      </Shop>
    </>
  );
}

export default App;

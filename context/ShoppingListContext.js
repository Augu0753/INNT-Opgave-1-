import React, { createContext, useState } from 'react';

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (name) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: (prevItems.length + 1).toString(), name },
    ]);
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
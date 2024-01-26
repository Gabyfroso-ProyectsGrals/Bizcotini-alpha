import React, { createContext, useState } from 'react';

const CategoryContx = createContext();

export const CategoryProvider = ({ children }) => {
  const [selecCategory, setSelecCategory] = useState('index'); //index default

  const updateCategory = (category) => {
    if (category) {
      setSelecCategory(category);
    } else {
      console.error('Categoria no existente');
      console.error(category);
    }
  };

  return (
    <CategoryContx.Provider value={{ selecCategory, updateCategory }}>
      {children}
    </CategoryContx.Provider>
  );
};

export default CategoryContx;

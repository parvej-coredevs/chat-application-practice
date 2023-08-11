import React, { createContext, useContext, useState } from 'react';

const context = createContext();

export default function Provider({ children }) {
  const [users, setUsers] = useState([]);

  return (
    <context.Provider value={{ users, setUsers }}>
      {children}
    </context.Provider>
  )
}

export const useProvider = () => useContext(context);

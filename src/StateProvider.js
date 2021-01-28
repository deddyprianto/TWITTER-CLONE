/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useReducer, createContext } from "react";

const CreateuserContext = createContext();

export const StateProvider = ({ reduce, initial, children }) => (
  <CreateuserContext.Provider value={useReducer(reduce, initial)}>
    {children}
  </CreateuserContext.Provider>
);
export const statevalueProvider = () => useContext(CreateuserContext);

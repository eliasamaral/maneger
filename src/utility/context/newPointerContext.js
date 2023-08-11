import React, { createContext } from "react";

export const NewPointerContext = createContext({
  ref: "",
  type: "",
  serviços: [],
  materiais: [],
  pendecias: [],
});

export const NewPointerProvider = (props) => {
  return <NewPointerContext.Provider value={{}} {...props}/>;
};

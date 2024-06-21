import React, { createContext } from "react";

const ThemeContext = createContext();

export function Provider(props) {
  let { store, children } = props;
  return (
    <ThemeContext.Provider value={{ store }}>{children}</ThemeContext.Provider>
  );
}

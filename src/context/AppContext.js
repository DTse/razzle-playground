import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

// Initial app state
let initialState = {
    open: false,
};

/**
   * useReducer returns a callback  that updates the state.
   * @param {string} state
   * @param {object} action
   * @return {any}
**/
let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setOpen":
      return { ...state, open: action.value };
    default:
      return state;
  }
};

/**
   * Context provider.
   * @param {object} props
   * @return {any}
**/
const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

/**
   * Context consumer.
   * @return {any}
**/
let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer, useAppContext };
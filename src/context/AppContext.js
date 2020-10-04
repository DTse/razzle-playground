import React, { createContext, useReducer, useContext, memo, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

axios.defaults.baseURL = "http://localhost:8000";

// Initial app state
let initialState = {
    open: false,
    pages: [],
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
        case "setPages":
            return { ...state, pages: [...action.value] };
        default:
            return state;
    }
};

/**
 * Context provider.
 * @param {object} props
 * @return {any}
 **/
const AppContextProvider = memo((props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    useEffect(() => {
        axios.get("/pages").then((res) => {
            dispatch({ type: "setPages", value: res.data });
        });
    }, []);

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
});

/**
 * Context consumer.
 * @return {any}
 **/
let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer, useAppContext };
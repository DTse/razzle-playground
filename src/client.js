import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";

hydrate(
    <BrowserRouter>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>,
    document.getElementById("root"),
    () => {
        // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
        const jssStyles = document.getElementById("jss-ssr");
        if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
    }
);

if (module.hot) {
    module.hot.accept();
}

import App from "./App";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheets } from "@material-ui/styles";
import { AppContextProvider } from "./context/AppContext";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

export const renderApp = (req, res) => {
    const sheets = new ServerStyleSheets();

    const context = {};
    const markup = renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </StaticRouter>
        )
    );

    const css = sheets.toString();
    const html =
        // prettier-ignore
        `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
      }
      ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
  </head>
  <body>
      <div id="root">${markup}</div>
      <!-- razzle_static_js -->
      <script src="${assets.client.js}" defer crossorigin></script>
  </body>
</html>`;

    return { html, context };
};

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get("/*", (req, res) => {
        const { html, context } = renderApp(req, res);

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            return res.redirect(301, context.url);
        }

        res.send(html);
    });

export default server;

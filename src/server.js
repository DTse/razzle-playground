import App from "./App";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheets } from "@material-ui/styles";
import { AppContextProvider } from "./context/AppContext";
import {Helmet} from 'react-helmet';

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
    const helmet = Helmet.renderStatic();
    const html =
        // prettier-ignore
        `<!doctype html>
  <html lang="en" ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
      <meta charSet='utf-8' />

      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="270"/>
      <meta property="og:image:height" content="270"/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@someuser"/>

      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta http-equiv="Content-Language" content="en">
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
      <meta property="fb:pages" content="99999999" />
      <meta name="apple-mobile-web-app-title" content="Razzle Playground">
      <meta name="application-name" content="Razzle Playground">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="white">
      ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
      }
      ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
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

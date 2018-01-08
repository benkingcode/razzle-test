import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    let modules = [];

    const context = {};
    const sheet = new ServerStyleSheet();
    const markup = renderToString(
      sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Loadable.Capture>
      )
    );

    let bundles = getBundles(stats, modules);

    const styleTags = sheet.getStyleTags();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Festicket Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${bundles
          .map(bundle => {
            return `<script src="/dist/${bundle.file}"></script>`;
          })
          .join('\n')}
        <script>window.main();</script>
        ${styleTags ? styleTags : null}
    </head>
    <body>
        <h1>Razzle</h1>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;

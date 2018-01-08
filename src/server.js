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

    const styleTags = sheet.getStyleTags();

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));

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
        ${styleTags ? styleTags : null}
    </head>
    <body>
        <h1>Razzle</h1>
        <div id="root">${markup}</div>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}"></script>`
            : `<script src="${assets.client.js}" crossorigin></script>`
        }
        ${chunks
          .map(
            chunk =>
              process.env.NODE_ENV === 'production'
                ? `<script src="/${chunk.file}"></script>`
                : `<script src="http://${process.env.HOST}:${process.env.PORT +
                    1}/${chunk.file}"></script>`
          )
          .join('\n')}
        <script>window.main();</script>
    </body>
</html>`
      );
    }
  });

export default server;

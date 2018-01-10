import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';

import Shoebox from './utils/Shoebox';
import reactTreeWalker from 'react-tree-walker';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const allParams = o =>
  Promise.all(Object.values(o)).then(promises =>
    Object.keys(o).reduce((o2, key, i) => ((o2[key] = promises[i]), o2), {})
  );

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    let modules = [];
    let dataPromises = {};

    function visitor(element, instance, context) {
      // console.log('Visitor', instance);
      if (
        instance &&
        'props' in instance &&
        'refetch' in instance.props &&
        typeof instance.props.refetch
      ) {
        dataPromises[instance.props.shoeboxId] = instance.props.refetch();
      }
      return true;
    }

    const context = {};
    const sheet = new ServerStyleSheet();

    let app = (
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    const data = await reactTreeWalker(app, visitor).then(() => {
      console.log('React tree walk', dataPromises);
      return allParams(dataPromises);
    });

    console.log('Resolved data', data);

    const markup = renderToString(
      sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Shoebox data={data}>
            <StaticRouter context={context} location={req.url}>
              <App initialData={data} />
            </StaticRouter>
          </Shoebox>
        </Loadable.Capture>
      )
    );

    console.log('Context', context);

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
        <script>
        window._SHOEBOX_DATA = ${JSON.stringify(data)};
        window.main();
        </script>
    </body>
</html>`
      );
    }
  });

export default server;

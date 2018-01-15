import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';

import Shoebox from './vendor/Shoebox';

window.main = () => {
  Loadable.preloadReady().then(() => {
    const data = window._SHOEBOX_DATA;

    hydrate(
      <Shoebox data={data}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Shoebox>,
      document.getElementById('root')
    );
  });
};

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('🔁  HMR Reloading `./App`...');
    window.main();
  });
}

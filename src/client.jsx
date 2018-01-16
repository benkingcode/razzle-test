import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';

import { ComponentDataStore } from 'festicket/vendor/react-data-fetching-components';

window.main = () => {
  Loadable.preloadReady().then(() => {
    const data = window._COMPONENT_DATA_;

    hydrate(
      <ComponentDataStore data={data}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ComponentDataStore>,
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

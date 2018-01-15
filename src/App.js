// Lib
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

// Components
import WebShell from 'festicket/components/WebShell';

const App = () => (
  <Switch>
    <Route path="/" component={WebShell} />
  </Switch>
);

export default App;

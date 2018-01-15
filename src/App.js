// Lib
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

// Components
import Home from 'festicket/components/Home';

const App = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default App;

// Lib
import React, { Component } from 'react';
import { Switch } from 'react-router';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';

// Components
import Home from './Home';
import About from './About';
import Festival from './Festival';

// Styles
import { Nav, Wrapper } from './styles';

export default class WebShell extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Festicket</h1>
        <Nav>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/about" onMouseOver={() => About.preload()}>
              About
            </Link>
          </div>
          <div>
            <Link to="/festivals/1" onMouseOver={() => Festival.preload()}>
              Festival 1
            </Link>
          </div>
          <div>
            <Link to="/festivals/2" onMouseOver={() => Festival.preload()}>
              Festival 2
            </Link>
          </div>
        </Nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/festivals/:id" component={Festival} />
        </Switch>
      </Wrapper>
    );
  }
}

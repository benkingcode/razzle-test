// Lib
import React, { Component } from 'react';
import { Switch } from 'react-router';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';

// Components
import HomeIndex from './HomeIndex';
import About from './About';
import Festival from './Festival';

// Styles
import { Nav, Wrapper } from './styles';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Festicket</h1>
        <Nav>
          <div>
            <Link to="/">Index</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
          <div>
            <Link to="/festivals/1">Festival 1</Link>
          </div>
          <div>
            <Link to="/festivals/2">Festival 2</Link>
          </div>
        </Nav>
        <Switch>
          <Route exact path="/" component={HomeIndex} />
          <Route path="/about" component={About} />
          <Route exact path="/festivals/:id" component={Festival} />
        </Switch>
      </Wrapper>
    );
  }
}

export default Home;

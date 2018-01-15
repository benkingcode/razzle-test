// Lib
import React, { Component } from 'react';
import { Switch } from 'react-router';
import Route from 'react-router-dom/Route';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';

// Components
import Index from './components/Index';
import Loading from './components/Loading';

// Styles
const Nav = styled.nav`
  display: block;

  > div {
    display: inline-block;
  }

  a {
    display: inline-block;
    border: 1px solid #ccc;
    border-bottom: 0;
    margin-right: 10px;
    padding: 1em;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  font-family: system-ui;

  hr {
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

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
          <Route exact path="/" component={Index} />
          <Route
            path="/about"
            component={Loadable({
              loader: () => import('./components/About'),
              loading: Loading
            })}
          />
          <Route
            exact
            path="/festivals/:id"
            component={Loadable({
              loader: () => import('./components/Festival'),
              loading: Loading
            })}
          />
        </Switch>
      </Wrapper>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import About from './components/About';
import Index from './components/Index';

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
  color: red;
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
        </Nav>
        <Route exact path="/" component={Index} />
        <Route path="/about" component={About} />
      </Wrapper>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import styled from 'styled-components';

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
        <h1>Home</h1>
        <p>Paragraph.</p>
      </Wrapper>
    );
  }
}

export default Home;

import styled from 'styled-components';

export const Nav = styled.nav`
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

export const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  font-family: system-ui;

  hr {
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

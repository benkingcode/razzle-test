import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import withSSR from '../../utils/withSSR';
import FestivalExtra from './FestivalExtra';

const ExtraWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;

  > div {
    box-sizing: border-box;
    width: calc(50% - 20px);
    height: 150px;
    background: #fafafa;
    padding: 10px;
    margin: 10px;
  }
`;

// This Festival component makes a sequential data request based on
// its routing match prop. The tree walker will resolve the data request before
// rendering the component.
class Festival extends Component {
  static async getInitialData(props) {
    const apiRequest = await fetch(
      `https://reqres.in/api/products/${props.match.params.id}`
    );
    const json = await apiRequest.json();

    return { faker: json.data };
  }

  loading() {
    return <div>Loading festival data...</div>;
  }

  render() {
    const extraBaseId = this.props.data.faker.id + 1;

    return (
      <div>
        <p>This is a festival page with dynamic data:</p>
        <h2 style={{ color: this.props.data.faker.color }}>
          {this.props.data.faker.name}
        </h2>
        <hr />
        <ExtraWrapper>
          <FestivalExtra id={extraBaseId} />
          <FestivalExtra id={extraBaseId + 1} />
          <FestivalExtra id={extraBaseId + 2} />
          <FestivalExtra id={extraBaseId + 3} />
          <FestivalExtra id={extraBaseId + 4} />
          <FestivalExtra id={extraBaseId + 5} />
          <FestivalExtra id={extraBaseId + 6} />
          <FestivalExtra id={extraBaseId + 7} />
          <FestivalExtra id={extraBaseId + 8} />
          <FestivalExtra id={extraBaseId + 9} />
        </ExtraWrapper>
      </div>
    );
  }
}

export default withSSR(Festival);

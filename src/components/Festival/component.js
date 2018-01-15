import React, { Component } from 'react';
import fetch from 'festicket/utils/api';
import withInitialData from 'festicket/utils/withInitialData';

// Components
import FestivalExtra from './FestivalExtra';

// Styles
import { ExtraWrapper } from './styles';

// This Festival component makes a sequential data request based on
// its routing match prop. The tree walker will resolve the data request before
// rendering the component.
class Festival extends Component {
  static async getInitialData(props) {
    return fetch(`https://reqres.in/api/products/${props.match.params.id}`);
  }

  error() {
    return <div>Error loading festival data!</div>;
  }

  loading() {
    return <div>Loading festival data...</div>;
  }

  render() {
    const extraBaseId = this.props.data.data.id + 1;

    return (
      <div>
        <p>This is a festival page with dynamic data:</p>
        <h2 style={{ color: this.props.data.data.color }}>
          {this.props.data.data.name}
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

export default withInitialData(Festival);

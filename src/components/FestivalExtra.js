import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import withSSR from '../utils/withSSR';

class FestivalExtra extends Component {
  static async getInitialData(props) {
    const apiRequest = await fetch(
      `https://reqres.in/api/products/${props.id}`
    );
    const json = await apiRequest.json();

    return { extraFaker: json.data };
  }

  loading() {
    return <div>Loading extra data...</div>;
  }

  render() {
    return (
      <div>
        <p>This is extra data from a nested data-fetching component:</p>
        <h2 style={{ color: this.props.data.extraFaker.color }}>
          {this.props.data.extraFaker.name}
        </h2>
      </div>
    );
  }
}

export default withSSR(FestivalExtra);

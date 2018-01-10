import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import withSSR from '../utils/withSSR';

class FestivalExtra extends Component {
  static async getInitialData(props) {
    const apiRequest = await fetch(`https://reqres.in/api/products/10`);
    const extraFaker = await apiRequest.json();

    return { extraFaker };
  }

  render() {
    let data;
    if (this.props.data) {
      data = this.props.data;
    }
    console.log('Rendering festival extra props', this.props);

    return (
      <div>
        <p>This is extra data from a nested data-fetching component:</p>
        {data && data.extraFaker ? (
          <h2 style={{ color: data.extraFaker.data.color }}>
            {data.extraFaker.data.name}
          </h2>
        ) : null}
      </div>
    );
  }
}

export default withSSR(FestivalExtra);

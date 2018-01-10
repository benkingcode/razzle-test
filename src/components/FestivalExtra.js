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
    if (this.props.isLoading) {
      return <div>Loading extra data...</div>;
    }

    return (
      <div>
        <p>This is extra data from a nested data-fetching component:</p>
        {this.props.data && this.props.data.extraFaker ? (
          <h2 style={{ color: this.props.data.extraFaker.data.color }}>
            {this.props.data.extraFaker.data.name}
          </h2>
        ) : null}
      </div>
    );
  }
}

export default withSSR(FestivalExtra);

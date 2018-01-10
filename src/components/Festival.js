import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import withSSR from '../utils/withSSR';
import FestivalExtra from './FestivalExtra';

class Festival extends Component {
  static async getInitialData(props) {
    const apiRequest = await fetch(
      `https://reqres.in/api/products/${props.match.params.id}`
    );
    const faker = await apiRequest.json();

    return { faker };
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading festival data...</div>;
    }

    let data;
    if (this.props.data) {
      data = this.props.data;
    }

    return (
      <div>
        <p>This is a festival page with dynamic data:</p>
        {data && data.faker ? (
          <h2 style={{ color: data.faker.data.color }}>
            {data.faker.data.name}
          </h2>
        ) : null}
        <hr />
        <div>
          <FestivalExtra />
        </div>
      </div>
    );
  }
}

export default withSSR(Festival);

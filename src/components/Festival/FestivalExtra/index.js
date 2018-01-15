import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import withInitialData from 'festicket/utils/withInitialData';

// This FestivalExtra component makes a parallelised data request.
// Any use of this.props.data must be wrapped in a safety check, as it will
// not be populated during tree walking.
class FestivalExtra extends Component {
  static inParallel = true;

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
        {this.props.data ? (
          <h2 style={{ color: this.props.data.extraFaker.color }}>
            {this.props.data.extraFaker.name}
          </h2>
        ) : null}
      </div>
    );
  }
}

export default withInitialData(FestivalExtra);

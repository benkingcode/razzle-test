import React, { Component } from 'react';
import fetch from 'festicket/utils/api';
import { withInitialData } from 'festicket/vendor/react-data-fetching-components';

// This FestivalExtra component makes a parallelised data request.
// Any use of this.props.data must be wrapped in a safety check, as it will
// not be populated during tree walking.
class FestivalExtra extends Component {
  static inParallel = true;

  static getInitialData(props) {
    return fetch(`https://reqres.in/api/products/${props.id}`);
  }

  error() {
    return <div>Error loading extra data!</div>;
  }

  loading() {
    return <div>Loading extra data...</div>;
  }

  render() {
    return (
      <div>
        <p>This is extra data from a nested data-fetching component:</p>
        {this.props.data ? (
          <h2 style={{ color: this.props.data.data.color }}>
            {this.props.data.data.name}
          </h2>
        ) : null}
      </div>
    );
  }
}

export default withInitialData(FestivalExtra);

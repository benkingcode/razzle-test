import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';

class Festival extends Component {
  static async getInitialProps() {
    const apiRequest = await fetch(`https://reqres.in/api/products/1`);
    const faker = await apiRequest.json();

    return { faker };
  }

  render() {
    return (
      <div>
        <p>This is a festival page with dynamic data.</p>
        <h2 style={{ color: this.props.faker.data.color }}>
          {this.props.faker.data.name}
        </h2>
      </div>
    );
  }
}

export default Festival;

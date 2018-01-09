import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

class Festival extends Component {
  static async getInitialProps() {
    console.log('Get initial props');
    const apiRequest = await fetch(`https://reqres.in/api/products/1`);
    const faker = await apiRequest.json();

    return { faker };
  }

  render() {
    console.log('Rendering festival', this.props);

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

import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

class Festival extends Component {
  static async getInitialProps() {
    const apiRequest = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const data = await apiRequest.json();

    return { data };
  }

  render() {
    console.log('Rendering festival', this.props);

    return (
      <div>
        <p>This is a festival page with dynamic data.</p>
        <h2>{this.props.data.title}</h2>
      </div>
    );
  }
}

export default Festival;

import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';

import AboutChild from './AboutChild';

class About extends Component {
  render() {
    return (
      <div>
        <p>
          This is an about page. Go to a{' '}
          <Link to="/about/child">child route</Link>.
        </p>
        <Route path="/about/child" component={AboutChild} />
      </div>
    );
  }
}

export default About;

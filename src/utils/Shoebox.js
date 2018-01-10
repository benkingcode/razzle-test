import React from 'react';
import PropTypes from 'prop-types';

export default class Shoebox extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static childContextTypes = {
    shoebox: PropTypes.shape({
      data: PropTypes.object.isRequired
    }).isRequired
  };

  getChildContext() {
    return {
      shoebox: {
        data: this.props.data
      }
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

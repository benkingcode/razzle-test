import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading';

const LoadableFestivalComponent = Loadable({
  loader: () => import('./component'),
  loading: Loading
});

export default class LoadableFestival extends Component {
  render() {
    return <LoadableFestivalComponent {...this.props} />;
  }
}

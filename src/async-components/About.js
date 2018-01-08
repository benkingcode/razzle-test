import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('../components/About'),
  loading: Loading
});

export default class LoadableDashboard extends Component {
  render() {
    return <LoadableComponent />;
  }
}

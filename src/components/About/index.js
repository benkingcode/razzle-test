import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading';

const LoadableAboutComponent = Loadable({
  loader: () => import('./component'),
  loading: Loading
});

export default class LoadableAbout extends Component {
  render() {
    return <LoadableAboutComponent {...this.props} />;
  }
}

import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () =>
    import('../components/Festival').then(module => {
      const ModuleComponent = module.default;

      if ('getInitialProps' in ModuleComponent) {
        return ModuleComponent.getInitialProps().then(resolvedProps => {
          return <ModuleComponent {...resolvedProps} />;
        });
      }

      return <ModuleComponent />;
    }),
  loading: Loading,
  render(loaded, props) {
    return loaded;
  }
});

export default class LoadableDashboard extends Component {
  render() {
    return <LoadableComponent {...this.props} />;
  }
}

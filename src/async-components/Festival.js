import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () =>
    import('../components/Festival').then(module => {
      const ModuleComponent = module.default;
      console.log('Loaded module', ModuleComponent);

      if ('getInitialProps' in ModuleComponent) {
        return ModuleComponent.getInitialProps().then(props => {
          return <ModuleComponent {...props} />;
        });
      }

      return <ModuleComponent />;
    }),
  loading: Loading,
  render(loaded, props) {
    console.log('Render', loaded, props);
    return loaded;
  }
});

export default class LoadableDashboard extends Component {
  render() {
    console.log('Loadable festival', this.props);
    return <LoadableComponent {...this.props} />;
  }
}

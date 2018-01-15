const { ReactLoadablePlugin } = require('react-loadable/webpack');
const path = require('path');
const appConfig = require('./config');

module.exports = {
  modify: (config, { target }) => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [appConfig.moduleName]: path.resolve(__dirname, 'src/')
        }
      }
    };

    if (target === 'web') {
      newConfig.plugins = [
        ...newConfig.plugins,
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json'
        })
      ];
    }

    return newConfig;
  }
};

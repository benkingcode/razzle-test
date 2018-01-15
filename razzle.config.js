const { ReactLoadablePlugin } = require('react-loadable/webpack');
const path = require('path');
const appConfig = require('./config');

module.exports = {
  modify: (config, { target }) => {
    if (target === 'web') {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            [appConfig.moduleName]: path.resolve(__dirname, 'src/')
          }
        },
        plugins: [
          ...config.plugins,
          new ReactLoadablePlugin({
            filename: './build/react-loadable.json'
          })
        ]
      };
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [appConfig.moduleName]: path.resolve(__dirname, 'src/')
        }
      }
    };
  }
};

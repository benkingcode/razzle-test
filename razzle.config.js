const Loadable = require('react-loadable/webpack');

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config.plugins.push(
      new Loadable.ReactLoadablePlugin({
        filename: './build/react-loadable.json'
      })
    );

    return config;
  }
};

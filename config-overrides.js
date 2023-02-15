const webpack = require('webpack')

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  )(
    (config.module.rules = [
      ...config.module.rules,
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ]),
  )

  return config
}

// @ts-check
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./option.base')
const utils = require('./utils')
const { ENV_DEVELOPMENT: mode } = require('./config')

/**
 * @param {import('./interface').DevelopmentConfig} config
 * @param {import('./interface').Callback[]} callbacks
 * @returns {*}
 */
module.exports = (config, ...callbacks) => {
  const { useEslint = true } = config
  const envConfig = utils.readEnvConfig(mode, config)
  return merge(
    baseConfig(envConfig, { useEslint: useEslint }),
    {
      mode,
      devtool: 'eval-cheap-module-source-map',
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ],
      devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
      },
      target: 'web',
    },
    ...callbacks.map(t => t(envConfig))
  )
}

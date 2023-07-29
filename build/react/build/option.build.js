// @ts-check
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const baseConfig = require('./option.base')
const utils = require('./utils')
const { ENV_PRODUCTION: mode, REPORT } = require('./config')

/**
 * @param {import('./interface').ProductionConfig} config
 * @param {import('./interface').Callback[]} callbacks
 * @returns {*}
 */
module.exports = (config, ...callbacks) => {
  const { sourceMap, gzip } = config
  const envConfig = utils.readEnvConfig(mode, config)
  return merge(
    baseConfig(envConfig, { useEslint: false }),
    {
      mode,
      ...(sourceMap ? { devtool: 'source-map' } : {}),
      plugins: [
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }),
        new CleanWebpackPlugin(),
        ...(REPORT ? [new BundleAnalyzerPlugin()] : []),
        ...(gzip ? [new CompressionPlugin()] : []),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              safari10: true,
              compress: {
                drop_console: true,
                ecma: 5,
                comparisons: false,
                inline: 2,
              },
              parse: {
                ecma: 5,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
      }
    },
    ...callbacks.map(t => t(envConfig))
  )
}

// @ts-check
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')

/**
 * @param {import('./interface').EnvConfig} envConfig 
 * @returns {*}
 */
module.exports = (envConfig, { useEslint }) => {
  const { name, version, mode, env, isWatch, publicPath, remUnit } = envConfig
  return {
    entry: {
      app: utils.rootPath('src/main.tsx')
    },
    output: {
      path: utils.rootPath('dist'),
      filename: utils.assetsPath(publicPath, isWatch ? 'js/[name].js' : 'js/[name].[chunkhash].js'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': utils.rootPath('src'),
        'lodash': 'lodash-es',
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?|mjs)$/,
          use: [
            'babel-loader',
            ...(isWatch && useEslint ? ['eslint-loader'] : [])
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            isWatch ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            ...(remUnit
              ? [{
                loader: 'px2rem-loader',
                options: {
                  remUnit,
                  remPrecision: 8
                }
              }]
              : []
            ),
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            isWatch ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isWatch ? '[path][name]__[local]' : '[hash:base64]',
                  exportLocalsConvention: 'camelCaseOnly'
                }
              }
            },
            ...(remUnit
              ? [{
                loader: 'px2rem-loader',
                options: {
                  remUnit,
                  remPrecision: 8
                }
              }]
              : []
            ),
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                additionalData: `@webpack-env: '${env}';`
              },
            }
          ]
        },
        {
          test: /\.ejs$/,
          use: 'underscore-template-loader'
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 2 * 1024
            }
          },
          generator: {
            filename: utils.assetsPath(publicPath, 'images/[name]-[hash][ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          type: 'asset/resource',
          generator: {
            filename: utils.assetsPath(publicPath, 'medias/[name]-[hash][ext]')
          }
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        memo: ['react', 'memo'],
        useState: ['react', 'useState'],
        useMemo: ['react', 'useMemo'],
        useCallback: ['react', 'useCallback'],
        useEffect: ['react', 'useEffect'],
        useRef: ['react', 'useRef'],
        useContext: ['react', 'useContext'],
        useReducer: ['react', 'useReducer'],
        useLayoutEffect: ['react', 'useLayoutEffect'],
        useImperativeHandle: ['react', 'useImperativeHandle'],
      }),
      new webpack.DefinePlugin({
        $APP_NAME: JSON.stringify(name),
        $APP_VERSION: JSON.stringify(version),
        $APP_MODE: JSON.stringify(mode),
        $APP_ENV: JSON.stringify(env),
      }),
      ...(isWatch ? [] : [
        new MiniCssExtractPlugin({
          filename: utils.assetsPath(publicPath, 'css/[name].[chunkhash].css'),
          ignoreOrder: true
        })
      ]),
    ],
    stats: {
      entrypoints: false,
      children: false
    },
    performance: {
      hints: false
    }
  }
}

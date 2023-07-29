// @ts-check
const path = require('path')
const portfinder = require('portfinder')
const {
  ENV_PRODUCTION,
  ENV_DEVELOPMENT,
  CONTEXT,
} = require('./config')

/**
 * @param {string[]} args
 * @returns {string}
 */
module.exports.rootPath = (...args) => {
  return path.join(CONTEXT, ...args)
}

/**
 * @param {string[]} args
 * @returns {string}
 */
module.exports.assetsPath = (...args) => {
  return args.map(t => t.replace(/^\/*|\/$/g, '')).join('/')
}

/**
 * @param {number} port
 */
module.exports.getAutoPort = async (port) => {
  return await portfinder.getPortPromise({ port })
}

/**
 * @param {import('./interface').EnvConfig['mode']} mode
 * @param {import('./interface').Options} options
 */
module.exports.readEnvConfig = (mode, options) => {
  const pkg = require(path.join(CONTEXT, 'package.json'))
  const topPkg = require(path.join(__dirname, '../package.json'))
  /** @type {import('./interface').EnvConfig} */
  const envConfig = {
    mode,
    env: mode === ENV_PRODUCTION ? (
      process.env.npm_config_env_dev ? 'dev'
        : process.env.npm_config_env_test ? 'test'
          : 'prod'
    ) : 'watch',
    isWatch: mode === ENV_DEVELOPMENT,
    publicPath: options.publicPath ?? 'public',
    remUnit: options.remUnit ?? false,
    name: pkg.name,
    version: pkg.version,
    dependencies: { ...topPkg.dependencies, ...pkg.dependencies },
    devDependencies: { ...topPkg.devDependencies, ...pkg.devDependencies },
  }
  console.log('当前环境:', mode, envConfig.env)
  return envConfig
}

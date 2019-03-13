'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const appSettings = require('../appsettings')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_SETTINGS: appSettings
})

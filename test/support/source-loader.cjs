'use strict'

const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const babel = require('@babel/core')
const compiler = require('vue-template-compiler')

// Exercise the checked-in source with the existing build dependencies. Avoid
// changing process-wide require hooks or using a separate copy of Vue/Axios.
const cache = new Map()

function resolveSource (filename) {
  for (const candidate of [filename, filename + '.js', filename + '.vue']) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  }
  throw new Error('Cannot find source module: ' + filename)
}

function loadSource (filename) {
  filename = resolveSource(path.resolve(filename))
  if (cache.has(filename)) return cache.get(filename).exports

  const source = fs.readFileSync(filename, 'utf8')
  const descriptor = filename.endsWith('.vue') ? compiler.parseComponent(source) : null
  const script = descriptor ? descriptor.script.content : source
  const transformed = babel.transformSync(script, {
    filename,
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-transform-modules-commonjs']
  })

  const loaded = new Module(filename, module)
  loaded.filename = filename
  loaded.paths = Module._nodeModulePaths(path.dirname(filename))
  const externalRequire = Module.createRequire(filename)
  loaded.require = request => request.startsWith('.')
    ? loadSource(path.resolve(path.dirname(filename), request))
    : externalRequire(request)
  cache.set(filename, loaded)
  loaded._compile(transformed.code, filename)

  if (descriptor && descriptor.template) {
    const render = compiler.compileToFunctions(descriptor.template.content)
    Object.assign(loaded.exports.default, render)
  }
  return loaded.exports
}

module.exports = { loadSource }

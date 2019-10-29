const mix = require('laravel-mix');

const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('dist')

if (mix.inProduction()) {
  mix
    .js('src/index.js', 'dist')
    .webpackConfig({
      plugins: [
        new PeerDepsExternalsPlugin(),
      ],
      output: {
        library: 'VueHelpers',
        libraryTarget: 'umd',
        umdNamedDefine: true
      }
    })
}

mix.js('src/demo.js', 'dist')

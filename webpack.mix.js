const mix = require('laravel-mix');

mix
  .js('src/orckid.js', 'dist/index.js')
  .setPublicPath('dist');
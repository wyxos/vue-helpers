const mix = require('laravel-mix');

mix
  .js('src/orckid.js', 'dist/index.js')
  .extract(['axios', 'keen-ui', 'vue-events'])
  .setPublicPath('dist');
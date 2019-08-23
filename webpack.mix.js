const pack = require('@horsepower/pack')

pack.ts('resources/assets/typescript/index.ts', 'public/js/app.js')
  .style([
    'resources/assets/styles/pure.scss',
    'resources/assets/styles/main.scss',
  ], 'public/css/main.css')

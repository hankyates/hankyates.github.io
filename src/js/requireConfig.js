require.config({
  baseUrl: 'js',
  paths: {
    lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min'
  },
  shim: {
    lodash: {
      exports: '_'
    }
  }
});

require(['app'], function(App) {
  var app = new App();
  app.init();
});

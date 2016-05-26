'use strict';

var loaded = {};

function cssHelper() {
  var result = '';
  var path = '';
  var page = this.path;
  loaded[page] = loaded[page] || {};

  for (var i = 0, len = arguments.length; i < len; i++) {
    path = arguments[i];

    if (i) result += '\n';

    if (Array.isArray(path)) {
      result += cssHelper.apply(this, path);
    } else {
      if (path.substring(path.length - 4, path.length) !== '.css') path += '.css';
      if (!loaded[page][path]) {
        result += '<link rel="stylesheet" href="' + this.url_for(path) + '">';
        loaded[page][path] = true;
      }
    }
  }

  return result;
}

hexo.extend.helper.register('css', cssHelper);
hexo.extend.filter.register('server_middleware', function(app) {
  app.use(function(res, req, next) {
    loaded = {};
    next();
  });
});
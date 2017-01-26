const conf = require('./gulp.conf');
const proxyMiddleware = require('http-proxy-middleware');
const demo = false;

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false,
    middleware: proxyMiddleware(
      demo? 'https://demo.gravitee.io/management' : 'http://localhost:8083/management',
      {changeOrigin: demo, secure: false}
    )
  };
};

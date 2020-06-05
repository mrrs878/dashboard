const proxy = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(proxy('/api', {
    target: process.env.REACT_APP_API_BASE_URL,
    changeOrigin: true
  }));
};

export {}

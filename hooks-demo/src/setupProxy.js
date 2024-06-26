//处理跨域
//通过http-proxy-middelware来实现跨域代理

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:9000",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^/api": "" },
    })
  );
};

//处理跨域
//通过http-proxy-middelware来实现跨域代理

const { createProxyMiddleware } = require("http-proxy-middleware");

module.export = function (app) {
  app.use(
    createProxyMiddleware("jian", {
      target: "",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^/jian": "" },
    })
  );

  app.use(
    createProxyMiddleware("zhi", {
      target: "",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^/zhi": "" },
    })
  );
};

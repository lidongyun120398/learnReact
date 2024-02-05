const { createProxyMiddleWare } = require('http-proxy-middle')
modele.export = function(app){
  app.use(
    createProxyMiddleWare("/api",{
      target:"http://127.0.0.1:9000",
      changeOrigin:true,
      ws:true,
      pathRewrite:{ "^/api": "" }
    })
  )
}
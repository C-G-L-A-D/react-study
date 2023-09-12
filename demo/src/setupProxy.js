const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8000',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '/api': '' }
    })
  )
  app.use(
    createProxyMiddleware('/my-api', {
      target: 'http://localhost:9000',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '/api': '' }
    })
  )
}

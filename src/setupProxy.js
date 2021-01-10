const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/weather-api-host',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_WEATHER_HOST,
      changeOrigin: true,
    })
  )
}

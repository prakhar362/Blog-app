const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (root) {
    root.use(
    '/api', // Adjust the path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Specify the address of your backend server
      changeOrigin: true,
      secure: false, // Set to false if your backend doesn't use HTTPS
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173', // Adjust the React app's origin
      },
    })
  );
};
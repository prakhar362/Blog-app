const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (root) {
    root.use(
    '/api', // Adjust the path you want to proxy
    createProxyMiddleware({
      target: 'https://blog-app-okt3.onrender.com', // Specify the address of your backend server
      changeOrigin: true,
      secure: false, // Set to false if your backend doesn't use HTTPS
      headers: {
        'Access-Control-Allow-Origin': 'https://inskpire.vercel.app', // Adjust the React app's origin
      },
    })
  );
};
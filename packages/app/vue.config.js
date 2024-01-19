module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:3000",
        // target: "http://175.178.83.92:7120",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

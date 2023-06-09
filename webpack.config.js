const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        resolve: {
          extensions: ["", ".js", ".jsx"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    host: "localhost",
    port: 3001,
  },
}

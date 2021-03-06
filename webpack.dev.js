const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const entries = {
  index: "",
  about: "",
};

const HtmlWebpackPlugins = [];

Object.keys(entries).map((entry) => {
  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/views/${entry}.html`,
      filename: entry + ".html",
    })
  );
});

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpe?g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
            publicPath: "images",
          },
        },
      },
    ],
  },
  plugins: [...HtmlWebpackPlugins],
  output: {
    filename: "js/[name].[hash].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./build",
    port: 700,
  },
};

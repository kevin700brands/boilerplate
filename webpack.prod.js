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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  );
});

module.exports = {
  mode: "production",
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
    ],
  },
  plugins: [...HtmlWebpackPlugins],
  output: {
    filename: "js/bundle.[hash].js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

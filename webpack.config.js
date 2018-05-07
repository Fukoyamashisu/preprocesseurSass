const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


module.exports = (env, argv) => {

  return {
    module:{
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: { importLoaders: 2,minimize:argv.mode !== "development" }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [require("autoprefixer")()]
                }
              },
              {
                loader: "sass-loader"
              },
            ]
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: { importLoaders: 1, minimize:argv.mode !== "development" }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [require("autoprefixer")()]
                }
              }
            ]
          })
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "file-loader"
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "[name].[hash:7].[ext]"
              }
            },
            {
              loader: "img-loader",
              options: {
                enabled: argv.mode !== "development"
              }
            }
          ]
        }
      ],
    },
    plugins: [
        new HTMLPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new ExtractTextPlugin("styles.css")
      ],
    devServer: {
      contentBase: path.join(__dirname, "src"),
      port: 4000,
      hot: true,
      hotOnly: true
    }
  }
};
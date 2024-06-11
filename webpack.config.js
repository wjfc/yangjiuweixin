const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: '[name].chunk.js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      "@": resolve("src"),
    }
  },
  mode: isProduction ? 'production' : 'development',
  devServer: {
    open: false,
    port: 30008,
    proxy: {
      "/apigateway": {
        target: "https://gdzhypt.baron.com.cn",
        changeOrigin: true
      },
      "/res": {
        target: "https://gdzhypt.baron.com.cn",
        changeOrigin: true
      },
      "/ugc": {
        target: "https://gdzhypt.baron.com.cn",
        changeOrigin: true
      },
      "/interface": {
        target: "https://gdzhypt.baron.com.cn",
        changeOrigin: true
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        include: [path.resolve(__dirname, './src')],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          'css-loader',
          'postcss-loader',
          'less-loader',
          
        ],
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'javascript/auto',
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              esModule: false
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(), //新增
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
}
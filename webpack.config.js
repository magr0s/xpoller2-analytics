const path = require('path')
const webpack = require('webpack')

module.exports = (env, args) => {
  const api = (args.mode === 'development')
    ? 'https://cors-anywhere.herokuapp.com/https://gastro.vseopecheni.ru/assets/components/xpoller2-analytics/connectors/connector.php'
    : 'https://gastro.vseopecheni.ru/assets/components/xpoller2-analytics/connectors/connector.php'

  return {
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'core.js',
      path: path.resolve(__dirname, 'assets/components/xpoller2-analytics/js'),
      publicPath: 'assets/components/xpoller2-analytics/js'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'api': JSON.stringify(api)
        }
      })
    ],

    devServer: {
      overlay: true
    }
  }
}

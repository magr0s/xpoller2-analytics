const path = require('path')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'core.js',
    path: path.resolve(__dirname, '../assets/components/xpoller2-analytics'),
    publicPath: '/assets/components/xpoller2-analytics'
  },
  devServer: {
    overlay: true
  }
}

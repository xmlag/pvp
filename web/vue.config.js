module.exports = {
  // outputDir:__dirname + '/../server/web',
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/web/'
  // : '/'
  outputDir:__dirname + '/../server/vue',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
}
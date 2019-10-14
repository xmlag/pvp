module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true
  })

  // 数据库中，引用了某模型，但是没有用到的话，有可能会报错，所以这里将所有模型都引用一遍
  require('require-all')(__dirname + '/../models')

}
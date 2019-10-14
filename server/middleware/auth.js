module.exports = options => {
  // 为了以后可配置，不直接导出函数，而是导出可以接受options参数的函数

  const AdminUser = require('../models/AdminUser')
  const jwt =  require('jsonwebtoken')
  const assert = require('http-assert')

  return async (req, res, next) =>{
    const token = String(req.headers.authorization || '').split(' ').pop() 
    assert(token, 401, '请先登录（没有token）')
    const {id} = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录（读取id出错）')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
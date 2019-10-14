module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const jwt =  require('jsonwebtoken')
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true
  }) 

  // 创建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 编辑某个分类时，跳转过去要自动拿到这个分类的数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 编辑分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 拿到资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    // parent的关联查询 的 条件判断
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })

  // 授权（是否登录）中间件
  const authMiddleware = require('../../middleware/auth')
  // 资源中间件（根据请求接口转换成类名modelname，进行查找）
  const resourceMiddelware = require('../../middleware/resource')
  
  // 挂载路由
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddelware(), router)
  
  // 上传图片接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 管理员登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 返回token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({token})
  })

  // 错误处理函数
  app.use( async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
     message: err.message 
    })
  }) 
}


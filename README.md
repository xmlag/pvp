# pvp
NodeJs + VueJs (Express + ElementUI) 全栈开发王者荣耀网站

## 项目开始
1. 创建目录
   1. 创建 server 文件夹 这对应服务端
   2. 用 vuw create 分别创建 admin（后台管理） 和 web（手机网站） 项目，
2. 初始化后台
   1. npm init -y
   2. 安装 nodemon
   3. 在 package.json 中，添加自定义脚本 `"serve":"nodemon index.js"`

## 后台管理(admin)
1. `vue add element`
2. `vue add router`
3. 使用 element-UI 的 container 布局 搭建后台的主界面
4. 修改container 布局
5. 安装 axios ，并将axios实例化写入 index.js 中，在 main.js 引入 http 作为 axios 的实例化，并写入 Vue 的原型属性中，使我们能很方便的使用 `this.$http`
6. 无能为力了。。。

## 服务端（server）
1. 安装必要的插件 `npm i express@next mongoose cors`
2. 在 `index`.js 中启动express
3. 在 `plugins` 下的 `db.js` 中 连接数据库
4. 在 `models` 下的 `Category.js` 中 创建 关于分类的数据集合
5. 在 `routes` 下的 admin 下的 `index.js` 中 编写 关于 后台管理的数据请求接口
6. 然后 在 index.js 中 引用 `db.js` 和 `routes/admin/index.js` （注意他们的导出和引用方式，是作为函数而不是对象）
7. 在 `index.js` 引用 `express.json()`（解析json） 和 `cors` (解决跨域)


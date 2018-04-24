var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages') // 设置应用视图根目录， 可以接受一个数据，会按照数组顺序查找文件
app.set('view engine', 'jade') // 设置默认的模板引擎
app.use(express.static(path.join(__dirname, './bower_components'))) // 设置静态文件目录
app.use(bodyParser.urlencoded()) // 解析post请求参数
app.locals.momment = require('moment') // 引入moment函数
app.listen(port, () => console.log('app listening on port 3000!'))

// middleware 测试中间件
app.use(function(req, res, next) {
  console.log("当前访问的时间", new Date())
  next()
})

// router
app.get('/', function (req, res) {
  res.render('pages/index', {
    title: '电影首页'
  })
})
app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: '电影列表页'
  })
})
app.get('/movie/:id', function (req, res) {
  res.render('detail', {
    title: '电影详情页'
  })
})
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: '电影后台录入页'
  })
})
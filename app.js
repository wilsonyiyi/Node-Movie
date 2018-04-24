var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views') // 设置视图根目录
app.set('view engine', 'jade') // 设置默认的模板引擎
app.listen(port)

console.log('服务启动，端口号：' +port)

// router
app.get('/', function (req, res) {
  res.render('index', {
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
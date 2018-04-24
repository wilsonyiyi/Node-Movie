var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages') // 设置应用视图根目录， 可以接受一个数据，会按照数组顺序查找文件
app.set('view engine', 'jade') // 设置默认的模板引擎
app.use(express.static(path.join(__dirname, 'bower_components'))) // 设置静态文件目录
app.use(bodyParser.urlencoded({ extended: true })) // 解析post请求参数
app.locals.momment = require('moment') // 引入moment函数
app.listen(port, () => console.log('app listening on port 3000!'))

// middleware 测试中间件
app.use(function(req, res, next) {
  console.log("当前访问的时间", new Date())
  next()
})

// router
app.get('/', function (req, res) {
  res.render('index', {
    title: '电影首页',
    movies: [{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 2,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 3,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 4,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 5,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 6,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    }]
  })
})

app.get('/movie/:id', function (req, res) {
  res.render('detail', {
    title: '电影详情页',
    movie: {
      doctor: '何塞·帕迪里亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '英语',
      flash: 'blob:https://baike.baidu.com/f692ccc3-17ef-49e6-8261-831f4efb6af9',
      summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
    }
  })
})

app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: '电影后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: '电影列表页',
    movies: [{
      _id: 1,
      doctor: '何塞·帕迪里亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      language: '英语',
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
    }]
  })
})
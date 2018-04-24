var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var _ = require('underscore')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/movie')

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
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: '电影首页',
      movies: movies
    })
  })

})

app.get('/movie/:id', function (req, res) {
  var id = req.params.id
  Movie.findById(id, function(err, movie){
    res.render('detail', {
      title: '电影详情页',
      movie: movie
    })
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

// 更新电影
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id
  if(id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: '天猫电影 后台更新页',
        movie: movie
      })
    })
  }
})

// 新增、修改电影
app.post('admin/movie/new', function (req, res) {
  var id = req.body._id
  var movieObj = req.body
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie){
      if (err) {
        console.log(err)
      }else{
        _movie = _.extend(movie, movieObj)
        _movie.save(function(err, movie) {
          if (err) {
            console.log(err)
          }else{
            res.redirect('/movie/'+movie._id)
          }
        })
      }
    })
  }else{
    // 调用模型
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash,
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }else{
        res.redirect('/movie/' + movie._id)
      }
    })
  }
})

app.get('/admin/list', function (req, res) {
  Movie.fetch(function(err, movies){
    if (err) {
      console.log(err)
    }else{
      res.render('list', {
        title: '电影列表页',
        movies: movies
      })
    }
  })
})
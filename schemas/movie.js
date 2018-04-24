var mongoose = require('mongoose')

// 字段定义，类型+默认值
var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  Flash: String,
  Poster: String,
  Year: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 添加数据库操作前方法
MovieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

// 添加方法
MovieSchema.static = {
  fetch: function(cb) {
    return this.find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this.findOne({ _id: id }).exec(cb)
  }
}

// commonjs方式导出模块
module.exports = MovieSchema

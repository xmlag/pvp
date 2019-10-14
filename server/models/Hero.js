const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  // 这个字段表示“职业分类”，有可能一个英雄是对应两个职业的，所以要用数组符号包起来，不然的话，就只允许对应一个
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [{
    // hreo: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hreo' },
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema,'heroes')
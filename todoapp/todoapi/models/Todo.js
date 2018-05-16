var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskModelSchema = new Schema({
  body: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

var TodoModelSchema = new Schema({
  title: String,
  tasks: [TaskModelSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TodoModel', TodoModelSchema);

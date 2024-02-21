const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Object,
  },
  creationDate: {
    type: Object,
  },
  userId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Task', taskSchema)

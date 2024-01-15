const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks')

router.get('/', getAllTasks)
router.post('/', addTask)
router.get('/:id', getTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router

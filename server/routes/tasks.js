const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks')
const verifyToken = require('../middleware/verifyToken')
router.get('/', verifyToken, getAllTasks)
router.post('/', verifyToken, addTask)
router.get('/:id', getTask)
router.patch('/:id', verifyToken, updateTask)
router.delete('/:id', verifyToken, deleteTask)

module.exports = router

const e = require('express')
const Task = require('../models/Task')
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).send('Server error')
  }
}
const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).send('Server error')
  }
}
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send(`No task with id: ${req.params.id}`)
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).send('Server error')
  }
}
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).send(`No task with id: ${req.params.id}`)
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).send('Server error')
  }
}
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send(`No task with id: ${req.params.id}`)
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).send('Server error')
  }
}

module.exports = { getAllTasks, addTask, getTask, updateTask, deleteTask }

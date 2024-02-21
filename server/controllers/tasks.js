const e = require('express')
const Task = require('../models/Task')
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
    console.log(tasks)
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).send('Server error')
  }
}
const addTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      creationDate: new Date().toISOString(),
      userId: req.user._id,
    }

    const task = await Task.create(taskData)
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
    const taskData = {
      ...req.body,
      creationDate: new Date().toISOString(),
    }
    const task = await Task.findByIdAndUpdate(req.params.id, taskData, {
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

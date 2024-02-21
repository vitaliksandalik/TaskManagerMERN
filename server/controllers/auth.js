const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res
      .header('auth-token', token)
      .json({ message: 'Logged in successfully', token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error })
  }
}

module.exports = { registerUser, loginUser }

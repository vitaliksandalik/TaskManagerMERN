const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  console.log(req.header('auth-token'))
  const token = req.header('auth-token').split(' ')[1]
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken

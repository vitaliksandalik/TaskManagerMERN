const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const port = 1234
const router = require('./routes/tasks')
const authRoutes = require('./routes/auth')
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use('/api/v1/tasks', router)
app.use('/api/v1/auth', authRoutes)

const start = async () => {
  try {
    await connectDB()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()

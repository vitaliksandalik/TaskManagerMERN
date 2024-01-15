const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const port = 1234
const router = require('./routes/tasks')
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use('/api/v1/tasks', router)

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

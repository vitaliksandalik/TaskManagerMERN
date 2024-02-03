/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tasks.css'
import ThemeSwitcher from './ThemeSwitcher'
import { ip, port } from '../constants'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ProgressBar from './Progressbar'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
const calculatePercentage = (task) => {
  const now = new Date()
  const creationDate = new Date(task.creationDate)
  const deadline = new Date(task.deadline)

  const totalDuration = deadline - creationDate
  const elapsed = now - creationDate
  const percentage = Math.min(100, (elapsed / totalDuration) * 100)
  console.log(percentage)

  return percentage
}
const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [inputData, setInputData] = useState('')
  const [deadline, setDeadline] = useState({})
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://${ip}:${port}/api/v1/tasks`)
      let data = await response.json()
      data = data.tasks
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((currentTasks) => {
        return currentTasks.map((task) => {
          const updatedProgress = calculatePercentage(task)
          return { ...task, progress: updatedProgress }
        })
      })
    }, 1000 * 1) // update every second

    return () => clearInterval(interval)
  }, [])
  const handleSubmit = async () => {
    try {
      console.log(deadline.$d)
      console.log(typeof deadline)
      const response = await fetch(`http://${ip}:${port}/api/v1/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputData, deadline }),
      })
      if (response.ok) {
        console.log('Task created successfully')
        setInputData('')
        await fetchTasks()
      } else {
        console.error('Failed to update task')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://${ip}:${port}/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        console.log('Task deleted successfully')
        await fetchTasks()
      } else {
        console.error('Failed to update task')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputData.length
      inputRef.current.setSelectionRange(length, length)
    }
  }, [inputData])
  return (
    <>
      <main>
        <div className="tasks-form">
          <h2 className="task-manager-title">Task Manager</h2>
          <div className="tasks-control-panel container">
            <input
              ref={inputRef}
              type="text"
              className="tasks-input item1"
              placeholder="e.g. Kill someone"
              onChange={(e) => {
                setInputData(e.target.value)
              }}
              value={inputData}
              onKeyDown={handleKeyDown}
            />
            <button className="tasks-submit-btn item2" onClick={handleSubmit}>
              Submit
            </button>
            <ThemeProvider theme={darkTheme}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  value={deadline}
                  onChange={(date) => setDeadline(date)}
                  className="date-time-picker item3"
                  sx={{
                    '& fieldset': { border: 'none' },
                  }}
                />
              </DemoContainer>
            </ThemeProvider>
          </div>
        </div>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <div className="task-grid">
                <h3
                  className="task-title"
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                  title={`Deadline: ${formatDate(task.deadline)}`}
                >
                  {task.name}
                </h3>
                <span className="tooltip">{formatDate(task.deadline)}</span>
                <div className="tasks-navigation-links">
                  <Link to={`/tasks/${task._id}`}>
                    <i className="fa-regular fa-pen-to-square icon"></i>
                  </Link>
                  <button
                    className="task-delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    <i className="fa-solid fa-trash icon"></i>
                  </button>
                </div>
              </div>
              <ProgressBar percentage={task.progress} />
            </div>
          ))}
        </div>
      </main>
      <ThemeSwitcher />
    </>
  )
}

export default Tasks

/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tasks.css'
import ThemeSwitcher from './ThemeSwitcher'
import { ip, port } from '../constants'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [inputData, setInputData] = useState('')
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
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://${ip}:${port}/api/v1/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputData }),
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
          <div className="tasks-control-panel">
            <input
              ref={inputRef}
              type="text"
              className="tasks-input"
              placeholder="e.g. Kill someone"
              onChange={(e) => {
                setInputData(e.target.value)
              }}
              value={inputData}
              onKeyDown={handleKeyDown}
            />
            <button className="tasks-submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <ThemeProvider theme={darkTheme}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                className="date-time-picker"
                sx={{
                  '& fieldset': { border: 'none' },
                }}
              />
            </DemoContainer>
          </ThemeProvider>
        </div>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div className="task-item" key={task._id}>
              <h3
                className="task-title"
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.name}
              </h3>
              <div className="task-deadline">24/12/2024</div>
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
          ))}
        </div>
      </main>
      <ThemeSwitcher />
    </>
  )
}

export default Tasks

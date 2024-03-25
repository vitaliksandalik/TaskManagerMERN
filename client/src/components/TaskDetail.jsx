import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../styles/TaskDetail.css'
import ThemeSwitcher from './ThemeSwitcher'
import { ip, port } from '../constants'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import dayjs from 'dayjs'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function TaskDetail() {
  let { id } = useParams()
  let navigate = useNavigate()
  const [taskData, setTaskData] = useState({
    name: '',
    completed: false,
  })
  const [deadline, setDeadline] = useState({})
  const [message, setMessage] = useState({ text: '', type: '' })
  const [showMessage, setShowMessage] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(null)

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://${ip}:${port}/api/v1/tasks/${id}`)
        const data = await response.json()
        if (response.ok) {
          setTaskData({
            name: data.task.name,
            completed: data.task.completed,
          })
          setDeadline(data.task.deadline)
        } else {
          console.error('Failed to fetch task')
        }
      } catch (error) {
        console.error('Error fetching task:', error)
      }
    }

    fetchTaskData()
  }, [id])

  useEffect(() => {
    let timer
    if (redirectCountdown > 0) {
      timer = setTimeout(
        () => setRedirectCountdown(redirectCountdown - 1),
        1000
      )
    } else if (redirectCountdown === 0) {
      navigate('/tasks')
    }
    return () => clearTimeout(timer)
  }, [redirectCountdown, navigate])

  const displayMessage = (text, type) => {
    setMessage({ text, type })
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setTimeout(() => setMessage({ text: '', type: '' }), 500)
    }, 2500)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const updatedTaskData = {
        ...taskData,
        deadline: deadline instanceof dayjs ? deadline.toISOString() : deadline,
      }
      const response = await fetch(`http://${ip}:${port}/api/v1/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTaskData),
      })
      if (response.ok) {
        displayMessage('Task updated successfully', 'success')
        setRedirectCountdown(3)
      } else {
        displayMessage('Failed to update task', 'error')
      }
    } catch (error) {
      displayMessage('Error updating task', 'error')
      console.error('Error:', error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <div className="task-detail-container">
        <h2 className="task-manager-title">Edit Task</h2>
        <div className="task-detail-input-field">
          <span>Deadline</span>
          <ThemeProvider theme={darkTheme}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                value={dayjs(deadline)}
                onChange={(deadline) => setDeadline(deadline)}
                className="date-time-picker item3"
                sx={{
                  '& fieldset': { border: 'none' },
                }}
              />
            </DemoContainer>
          </ThemeProvider>
        </div>
        <div className="task-detail-form-group">
          <div className="task-detail-input-field">
            <span>Name</span>
            <input
              type="text"
              className="task-detail-input"
              value={taskData.name}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="task-detail-input-field">
            <span>Completed</span>
            <input
              type="checkbox"
              className="task-detail-checkbox"
              checked={taskData.completed}
              onChange={(e) =>
                setTaskData({ ...taskData, completed: e.target.checked })
              }
            />
          </div>
          <button className="task-detail-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <Link to="/tasks">
          <button className="task-detail-submit-btn">Back to the tasks</button>
        </Link>

        <div
          className={`task-detail-message ${showMessage ? 'show' : ''} ${
            message.type
          }`}
        >
          {message.text}
          {redirectCountdown !== null && ` ${redirectCountdown}`}
        </div>
      </div>
      <ThemeSwitcher />
    </>
  )
}

export default TaskDetail

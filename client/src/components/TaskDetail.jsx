import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function TaskDetail() {
  let { id } = useParams()
  const [taskData, setTaskData] = useState({ name: '', completed: false })
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/v1/tasks/${id}`)
        let data = await response.json()
        data = data.task
        if (response.ok) {
          setTaskData({ name: data.name, completed: data.completed })
        } else {
          console.error('Failed to fetch task')
        }
      } catch (error) {
        console.error('Error fetching task:', error)
      }
    }

    fetchTaskData()
  }, [id])

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:1234/api/v1/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
      if (response.ok) {
        console.log('Task updated successfully')
        setSuccess(true)
      } else {
        console.error('Failed to update task')
        setSuccess(false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="task-edit-container">
      <h2>Edit Task</h2>
      <div className="task-edit-field">
        <span>Task ID</span>
        <p>{id}</p>
      </div>
      <div className="task-edit-field">
        <span>Name</span>
        <input
          type="text"
          className="task-input"
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
        />
      </div>
      <div className="task-edit-field">
        <span>Completed</span>
        <input
          type="checkbox"
          className="task-edit-checkbox"
          checked={taskData.completed}
          onChange={(e) =>
            setTaskData({ ...taskData, completed: e.target.checked })
          }
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      <Link to="/tasks">
        <button className="submit-button">Back to the tasks</button>
      </Link>

      {success ? <h3>Success</h3> : null}
    </div>
  )
}

export default TaskDetail

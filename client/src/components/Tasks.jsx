/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [inputData, setInputData] = useState('')
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:1234/api/v1/tasks')
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
      const response = await fetch(`http://localhost:1234/api/v1/tasks`, {
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
      const response = await fetch(`http://localhost:1234/api/v1/tasks/${id}`, {
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
  return (
    <>
      <main>
        <div className="task-form">
          <h2>Task Manager</h2>
          <div className="task-control">
            <input
              type="text"
              className="task-input"
              placeholder="ex. Buy ETH"
              onChange={(e) => {
                setInputData(e.target.value)
              }}
            />
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="tasks">
          {tasks.map((task) => (
            <div className="single-task" key={task._id}>
              <h3
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.name}
              </h3>
              <div className="task-links">
                <Link to={`/tasks/${task._id}`}>
                  <i className="fa-regular fa-pen-to-square icon"></i>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(task._id)}
                >
                  <i className="fa-solid fa-trash icon"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Tasks

const Tasks = () => {
  return (
    <>
      <div>
        <form className="task-form">
          <h2>Task Manager</h2>
          <div className="task-control">
            <input
              type="text"
              className="task-input"
              placeholder="ex. Buy ETH"
            />
            <button className="submit-button">Submit</button>
          </div>
        </form>
        <div className="tasks">
          <div className="single-task">
            <h3>wash dishes</h3>
            <div className="task-links">
              <a href="/task">
                <i className="fa-regular fa-pen-to-square icon"></i>
              </a>
              <button className="delete-button">
                <i className="fa-solid fa-trash icon"></i>
              </button>
            </div>
          </div>
          <div className="single-task">
            <h3>wash dishes</h3>
            <div className="task-links">
              <a href="/task">
                <i className="fa-regular fa-pen-to-square icon"></i>
              </a>
              <button className="delete-button">
                <i className="fa-solid fa-trash icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks

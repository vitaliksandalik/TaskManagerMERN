import { useState } from 'react' // Import useState
import '../styles/Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false) // State to toggle sidebar

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`sidebar ${isOpen ? 'active' : 'closed'}`}>
      <div className="header-container">
        <div className="open-close-icon-wrapper" onClick={toggleSidebar}>
          <i
            className={`fa-solid ${
              isOpen ? 'fa-xmark' : 'fa-bars'
            } open-close-icon fa-xl`}
          ></i>
        </div>
        <h2 className="title">{isOpen && 'Welcome, Vitalii'}</h2>
      </div>

      <div className="contents-container">
        <ul>
          <li>
            <i className="fa-solid fa-list-check"></i>
            {isOpen && <Link to={'/tasks'}>Tasks</Link>}
          </li>
          <li>
            <i className="fa-solid fa-registered"></i>
            {isOpen && <Link to={'/register'}>Register</Link>}
          </li>
          <li>
            <i className="fa-solid fa-right-to-bracket"></i>
            {isOpen && <Link to={'/login'}>Login</Link>}
          </li>
          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            {isOpen && <Link to={'/logout'}>Logout</Link>}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar

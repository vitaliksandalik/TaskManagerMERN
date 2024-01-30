/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../styles/Common.css'
import { ThemeProvider } from './ThemeContext'
import Tasks from './Tasks'
import TaskDetail from './TaskDetail'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

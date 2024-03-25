/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../styles/Common.css'
import { ThemeProvider } from './ThemeContext'
import Tasks from './Tasks'
import TaskDetail from './TaskDetail'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './AuthProvider'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Sidebar from './SideBar'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App

import { useState, useContext } from 'react'
import { AuthContext } from './AuthProvider'
import '../styles/RegistrationForm.css'
import ThemeSwitcher from './ThemeSwitcher'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleRegister } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isSuccess = await handleRegister(username, email, password)
    if (isSuccess) {
      navigate('/tasks')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="login-title">Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="register-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="register-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <ThemeSwitcher />
    </>
  )
}

export default RegistrationForm

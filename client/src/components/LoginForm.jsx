import { useState, useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import '../styles/LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isSuccess = await handleLogin(email, password)
    if (isSuccess) {
      navigate('/tasks')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <ThemeSwitcher />
    </>
  )
}

export default LoginForm

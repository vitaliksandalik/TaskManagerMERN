/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { ip, port } from '../constants'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`http://${ip}:${port}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log(data.token)
      if (data.token) {
        localStorage.setItem('token', data.token)
        setIsAuthenticated(true)
        setUser({ email }) // Or other user data as needed
      }
      return true
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegister = async (username, email, password) => {
    try {
      const response = await fetch(
        `http://${ip}:${port}/api/v1/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        }
      )
      const data = await response.json()
      if (data.user) {
        // Optionally log the user in immediately
        // handleLogin(email, password);
      }
      return true
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

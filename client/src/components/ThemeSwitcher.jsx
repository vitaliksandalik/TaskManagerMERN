/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import '../styles/ThemeSwitcher.css'
import { ThemeContext } from './ThemeContext'
import themes from '../themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleSwitch = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('color-scheme', newTheme)
  }

  return (
    <div className="themes-container">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => handleSwitch(t.name)}
          className="theme-button"
          style={{
            background: `linear-gradient(to right, ${t.primary} 50%, ${t.primaryDark} 50%)`,
          }}
        />
      ))}
    </div>
  )
}

export default ThemeSwitcher

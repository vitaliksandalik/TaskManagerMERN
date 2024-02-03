/* eslint-disable react/prop-types */
import '../styles/ProgressBar.css'
const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}
export default ProgressBar

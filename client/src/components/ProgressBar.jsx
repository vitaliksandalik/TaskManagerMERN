/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../styles/ProgressBar.css'
const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={
          percentage < 100
            ? {
                width:
                  percentage <= 10
                    ? `calc(${100 - percentage}% + 30px)`
                    : `${100 - percentage}%`,
              }
            : {
                width: `calc(100% + 30px)`,
                backgroundColor: 'red',
              }
        }
      ></div>
    </div>
  )
}
export default ProgressBar

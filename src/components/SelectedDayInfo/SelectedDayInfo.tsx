import React from 'react'
import cx from 'classnames'
import styles from './SelectedDayInfo.module.css'

const SelectedDayInfo = () => {
  return (
    <div className="d-flex">
      <div className="city-info mr-4">
        <h3>San Francisco</h3>
        <h6 className="display-6">September 25, 2015</h6>
        <img
          className={styles.weatherIcon}
          src="https://www.metaweather.com/static/img/weather/s.svg"
          alt="weather icon"
        />
        <h5>Cloudy</h5>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <h3 className={cx('display-3', styles.currentTemp)}>72°C</h3>
        <div>
          <h6 className="display-6">Max: 82°C</h6>
          <h6 className="display-6">Min: 82°C</h6>
        </div>
      </div>
    </div>
  )
}

export default SelectedDayInfo

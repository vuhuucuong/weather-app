import React from 'react'
import cx from 'classnames'
import styles from './WeatherCard.module.css'

interface WeatherCardProps {}

const WeatherCard: React.FC<WeatherCardProps> = ({ children }) => {
  return (
    <div
      className={cx('d-flex flex-column justify-content-center text-light p-5 border-0 shadow-sm', styles.dayWeatherCard)}
    >
      {children}
    </div>
  )
}

export default WeatherCard

import React from 'react'
import cx from 'classnames'
import styles from './WeatherCard.module.css'

interface WeatherCardProps {}

const WeatherCard: React.FC<WeatherCardProps> = ({ children }) => {
  return (
    <div
      className={cx(
        'w-100 d-flex flex-column justify-content-center align-items-center text-light border-0 shadow-sm overflow-auto',
        styles.dayWeatherCard
      )}
    >
      {children}
    </div>
  )
}

export default WeatherCard

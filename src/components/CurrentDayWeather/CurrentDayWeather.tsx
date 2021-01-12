import React from 'react'
import cx from 'classnames'
import styles from './CurrentDayWeather.module.css'
import dayjs from 'dayjs'
import { WeatherInfo } from '../../types/weather'
import { MMM_DD_YYYY_FORMAT } from '../../constants'

interface CurrentDayWeatherProps {
  weatherInfoCurrentDay: WeatherInfo
}

const CurrentDayWeather: React.FC<CurrentDayWeatherProps> = ({
  weatherInfoCurrentDay,
}) => {
  const {
    title,
    applicableDate,
    weatherStateName,
    weatherStateAbbr,
    theTemp,
    minTemp,
    maxTemp,
  } = weatherInfoCurrentDay
  return (
    <div
      data-testid="currentDayWeather"
      className="d-flex justify-content-between"
    >
      <div className="city-info me-5 d-flex flex-column align-items-start text-start">
        <h3>{title}</h3>
        <h6>{dayjs(applicableDate).format(MMM_DD_YYYY_FORMAT)}</h6>
        <img
          className={cx('mb-2', styles.weatherIcon)}
          src={`https://www.metaweather.com/static/img/weather/${weatherStateAbbr}.svg`}
          alt="weather icon"
        />
        <h5>{weatherStateName}</h5>
      </div>
      <div className="d-flex flex-column justify-content-between text-start">
        <h3 className={cx('display-3', styles.currentTemp)}>
          {theTemp.toFixed(0)}°C
        </h3>
        <div>
          <h6>
            Min: {minTemp.toFixed(0)}°C / Max: {maxTemp.toFixed(0)}°C
          </h6>
        </div>
      </div>
    </div>
  )
}

export default CurrentDayWeather

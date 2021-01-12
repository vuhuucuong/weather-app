import React from 'react'
import cx from 'classnames'
import styles from './WeekDayWeatherList.module.css'
import dayjs from 'dayjs'
import { formatTemp } from '../../utils'
import { WeatherInfo } from '../../types/weather'

interface WeekDayWeatherListProps {
  weatherInfoList: WeatherInfo[]
  selectedWeather: WeatherInfo
  setSelectedWeather: React.Dispatch<React.SetStateAction<WeatherInfo | null>>
}

const WeekDayWeatherList: React.FC<WeekDayWeatherListProps> = ({
  weatherInfoList,
  selectedWeather,
  setSelectedWeather,
}) => {
  const handleClickItem = (weatherInfo: WeatherInfo) => () => {
    setSelectedWeather(weatherInfo)
  }
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {weatherInfoList.map((weatherInfo) => {
        const {
          maxTemp,
          minTemp,
          theTemp,
          weatherStateAbbr,
          applicableDate,
        } = weatherInfo
        return (
          <div
            data-testid="weekdayItem"
            key={applicableDate}
            onClick={handleClickItem(weatherInfo)}
            className={cx(
              'd-flex flex-column align-items-center border border-warning rounded-3 p-2 mb-4 mx-2',
              styles.weekDayItem,
              {
                'bg-secondary':
                  applicableDate === selectedWeather.applicableDate,
              }
            )}
          >
            <h6>{dayjs(applicableDate).format('dddd')}</h6>
            <img
              style={{ width: 30 }}
              src={`https://www.metaweather.com/static/img/weather/${weatherStateAbbr}.svg`}
              alt="weather icon"
            />
            <h4>{formatTemp(theTemp)}°C</h4>
            <h6 className="text-nowrap">
              {formatTemp(minTemp)}°C / {formatTemp(maxTemp)}°C
            </h6>
          </div>
        )
      })}
    </div>
  )
}

export default WeekDayWeatherList

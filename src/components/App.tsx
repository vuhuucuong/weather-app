import React, { useEffect, useState } from 'react'
import styles from './App.module.css'
import { WeatherInfo } from '../types/weather'
import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'
import CurrentDayBlock from './CurrentDayWeather'
import WeekDayWeatherList from './WeekDayWeatherList'
import { getCurrentDayWeather } from '../utils'
import Spinner from './Spinner'

function App() {
  const [selectedWeather, setSelectedWeather] = useState<WeatherInfo | null>(
    null
  )
  const [listWeathers, setListWeathers] = useState<WeatherInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (listWeathers.length > 0) {
      const currentDayWeather = getCurrentDayWeather(listWeathers)
      setSelectedWeather(currentDayWeather)
    }
  }, [listWeathers])

  const renderCardContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner size={50} />
        </div>
      )
    }
    if (!selectedWeather) {
      return <h4 className="text-center">Please enter a city name to search</h4>
    }
    return (
      <>
        <CurrentDayBlock weatherInfoCurrentDay={selectedWeather} />
        <hr />
        <WeekDayWeatherList
          selectedWeather={selectedWeather}
          setSelectedWeather={setSelectedWeather}
          weatherInfoList={listWeathers}
        />
      </>
    )
  }

  return (
    <div className={styles.appWrapper}>
      <div className={styles.innerContainer}>
        <SearchBar
          setListWeathers={setListWeathers}
          setIsLoading={setIsLoading}
        />
        <WeatherCard>{renderCardContent()}</WeatherCard>
      </div>
    </div>
  )
}

export default App

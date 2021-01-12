import React, { useState, useEffect } from 'react'
import camelCase from 'camelcase'
import styles from './App.module.css'
import {
  GetWeatherResponse,
  GetWeatherConsolidatedWeather,
} from '../types/weather'
import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'
import CurrentDayBlock from './CurrentDayWeather'
import WeakDayWeatherList from './WeekDayWeatherList'
import { searchLocation, getWeather } from '../services/weather'

const data: GetWeatherResponse = {
  consolidated_weather: [
    {
      id: 6596919544512512,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'WSW',
      created: '2021-01-11T18:20:04.351115Z',
      applicable_date: '2021-01-11',
      min_temp: 0.5,
      max_temp: 8.77,
      the_temp: 7.465,
      wind_speed: 7.763851802958722,
      wind_direction: 256.63899955249303,
      air_pressure: 1018,
      humidity: 81,
      visibility: 8.84242275113338,
      predictability: 75,
    },
    {
      id: 5103321917423616,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'NNW',
      created: '2021-01-11T18:20:02.852065Z',
      applicable_date: '2021-01-12',
      min_temp: 1.55,
      max_temp: 9.395,
      the_temp: 7.67,
      wind_speed: 5.152404707887272,
      wind_direction: 346.2241926397258,
      air_pressure: 1014,
      humidity: 83,
      visibility: 9.703953909170444,
      predictability: 75,
    },
    {
      id: 5238153825746944,
      weather_state_name: 'Heavy Rain',
      weather_state_abbr: 'hr',
      wind_direction_compass: 'SW',
      created: '2021-01-11T18:20:03.059555Z',
      applicable_date: '2021-01-13',
      min_temp: 0.845,
      max_temp: 6.824999999999999,
      the_temp: 6.199999999999999,
      wind_speed: 4.382880749722951,
      wind_direction: 218.68268992300122,
      air_pressure: 1018.5,
      humidity: 93,
      visibility: 5.521504414220949,
      predictability: 77,
    },
    {
      id: 5415155585253376,
      weather_state_name: 'Heavy Rain',
      weather_state_abbr: 'hr',
      wind_direction_compass: 'NNE',
      created: '2021-01-11T18:20:02.972939Z',
      applicable_date: '2021-01-14',
      min_temp: 4.654999999999999,
      max_temp: 8.305,
      the_temp: 7.08,
      wind_speed: 5.48424202279753,
      wind_direction: 24.62259446210941,
      air_pressure: 1017,
      humidity: 92,
      visibility: 7.425696432832259,
      predictability: 77,
    },
    {
      id: 4861507406921728,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'N',
      created: '2021-01-11T18:20:03.273132Z',
      applicable_date: '2021-01-15',
      min_temp: 2.245,
      max_temp: 6.995,
      the_temp: 5.11,
      wind_speed: 5.785654736045494,
      wind_direction: 354.10870076782845,
      air_pressure: 1028.5,
      humidity: 77,
      visibility: 12.027260796945836,
      predictability: 75,
    },
    {
      id: 5026737667702784,
      weather_state_name: 'Light Cloud',
      weather_state_abbr: 'lc',
      wind_direction_compass: 'E',
      created: '2021-01-11T18:20:05.574593Z',
      applicable_date: '2021-01-16',
      min_temp: 1.565,
      max_temp: 5.25,
      the_temp: 3.07,
      wind_speed: 3.837921538216814,
      wind_direction: 86,
      air_pressure: 1031,
      humidity: 78,
      visibility: 9.999726596675416,
      predictability: 70,
    },
  ],
  time: '2021-01-11T18:55:30.139524Z',
  sun_rise: '2021-01-11T08:02:16.573541Z',
  sun_set: '2021-01-11T16:15:07.896150Z',
  timezone_name: 'LMT',
  parent: {
    title: 'England',
    location_type: 'Region / State / Province',
    woeid: 24554868,
    latt_long: '52.883560,-1.974060',
  },
  sources: [
    {
      title: 'BBC',
      slug: 'bbc',
      url: 'http://www.bbc.co.uk/weather/',
      crawl_rate: 360,
    },
    {
      title: 'Forecast.io',
      slug: 'forecast-io',
      url: 'http://forecast.io/',
      crawl_rate: 480,
    },
    {
      title: 'HAMweather',
      slug: 'hamweather',
      url: 'http://www.hamweather.com/',
      crawl_rate: 360,
    },
    {
      title: 'Met Office',
      slug: 'met-office',
      url: 'http://www.metoffice.gov.uk/',
      crawl_rate: 180,
    },
    {
      title: 'OpenWeatherMap',
      slug: 'openweathermap',
      url: 'http://openweathermap.org/',
      crawl_rate: 360,
    },
    {
      title: 'Weather Underground',
      slug: 'wunderground',
      url: 'https://www.wunderground.com/?apiref=fc30dc3cd224e19b',
      crawl_rate: 720,
    },
    {
      title: 'World Weather Online',
      slug: 'world-weather-online',
      url: 'http://www.worldweatheronline.com/',
      crawl_rate: 360,
    },
  ],
  title: 'London',
  location_type: 'City',
  woeid: 44418,
  latt_long: '51.506321,-0.12714',
  timezone: 'Europe/London',
}

const currentDayWeather = { ...data.consolidated_weather[0] }
const currentDayData = {
  title: data.title,
  weatherStateName: currentDayWeather.weather_state_name,
  weatherStateAbbr: currentDayWeather.weather_state_abbr,
  applicableDate: currentDayWeather.applicable_date,
  theTemp: currentDayWeather.the_temp,
  minTemp: currentDayWeather.min_temp,
  maxTemp: currentDayWeather.max_temp,
}

const weekDayData = data.consolidated_weather.map(
  ({ weather_state_abbr, the_temp, min_temp, max_temp, applicable_date }) => ({
    weatherStateAbbr: weather_state_abbr,
    minTemp: min_temp,
    maxTemp: max_temp,
    theTemp: the_temp,
    applicableDate: applicable_date,
  })
)

const getCurrentLocationWeather = async () => {
  const [location] = await searchLocation({
    queryType: 'text',
    queryString: `London`,
  })
  console.log(location)
  const weather = await getWeather({
    woeid: location.woeid,
  })
  console.log(weather)
}
function App() {
  useEffect(() => {
    getCurrentLocationWeather()
  }, [])
  return (
    <div className={styles.appWrapper}>
      <div className={styles.innerContainer}>
        <SearchBar />
        <WeatherCard>
          <CurrentDayBlock weatherInfoCurrentDay={currentDayData} />
          <hr />
          <WeakDayWeatherList weatherInfoList={weekDayData} />
        </WeatherCard>
      </div>
    </div>
  )
}

export default App

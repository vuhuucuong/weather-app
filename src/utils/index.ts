import dayjs from 'dayjs'
import {
  GetWeatherResponse,
  WeatherInfo,
  GetWeatherConsolidatedWeather,
} from '../types/weather'

export const formatTemp = (temp: number): string => temp.toFixed(0).toString()

export const transformWeatherResponse = (
  weatherResponse: GetWeatherResponse
): WeatherInfo[] => {
  try {
    const {
      consolidated_weather,
      title,
    }: {
      consolidated_weather: GetWeatherConsolidatedWeather[]
      title: string
    } = weatherResponse
    const transformedData: WeatherInfo[] = consolidated_weather.map(
      ({
        weather_state_name,
        the_temp,
        min_temp,
        max_temp,
        applicable_date,
        weather_state_abbr,
      }) => {
        return {
          title,
          weatherStateName: weather_state_name,
          theTemp: the_temp,
          minTemp: min_temp,
          maxTemp: max_temp,
          applicableDate: applicable_date,
          weatherStateAbbr: weather_state_abbr,
        }
      }
    )

    return transformedData
  } catch (error) {
    return []
  }
}

export const getCurrentDayWeather = (
  weatherInfoList: WeatherInfo[]
): WeatherInfo | null => {
  if (weatherInfoList.length === 0) {
    return null
  }
  const now = dayjs()
  const currentDayWeather = weatherInfoList.find(({ applicableDate }) => {
    const weatherDay = dayjs(applicableDate)
    if (now.diff(weatherDay, 'd') === 0) {
      return true
    }
    return false
  })
  return currentDayWeather || weatherInfoList[0]
}

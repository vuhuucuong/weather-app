interface GetWeatherParent {
  title: string
  location_type: string
  latt_long: string
  woeid: number
}
interface GetWeatherConsolidatedWeather {
  id: number
  created: string
  applicable_date: string
  weather_state_name: string
  weather_state_abbr: string
  wind_speed: number
  wind_direction: number
  wind_direction_compass: string
  min_temp: number
  max_temp: number
  the_temp: number
  air_pressure: number
  humidity: number
  visibility: number
  predictability: number
}

export type SearchLocationResponse = {
  title: string
  location_type: string
  latt_long: string
  woeid: number
}[]

export interface GetWeatherResponse {
  title: string
  location_type: string
  latt_long: string
  time: string
  sun_rise: string
  sun_set: string
  timezone_name: string
  parent: GetWeatherParent
  consolidated_weather: GetWeatherConsolidatedWeather[]
  woeid: number
  timezone: string
  sources: {
    title: string
    url: string
    slug?: string
    crawl_rate?: number
  }[]
}

export interface WeatherInfo {
  title: string
  weatherStateName: string
  theTemp: number
  minTemp: number
  maxTemp: number
  applicableDate: string
  weatherStateAbbr: string
}

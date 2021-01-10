interface GetWeatherParent {
  title: string
  location_type: string
  latt_long: string
  woeid: number
}
interface GetWeatherConsolidatedWeather {
  id: number
  applicable_date: Date
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

export interface SearchLocationResponse {
  title: string
  location_type: string
  latt_long: string
  woeid: number
  distance: number
}

export interface GetWeatherResponse {
  title: string
  location_type: string
  latt_long: string
  time: Date
  sun_rise: Date
  sun_set: Date
  timezone_name: string
  parent: GetWeatherParent
  consolidated_weather: GetWeatherConsolidatedWeather
  source: {
    title: string
    url: string
  }
}

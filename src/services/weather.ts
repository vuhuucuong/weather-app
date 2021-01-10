import axios from 'axios'
import { GetWeatherResponse, SearchLocationResponse } from '../types/weather'

interface SearchLocationParams {
  queryType: 'text' | 'lattlong'
  queryString?: string
}

export const searchLocation = ({
  queryType,
  queryString,
}: SearchLocationParams): Promise<SearchLocationResponse> => {
  const queryKey = queryType === 'text' ? 'query' : 'lattlong'
  return axios.get(
    `/weather-api-host/api/location/search/?${queryKey}=${queryString}`
  )
}

export const getWeather = ({
  woeId,
}: {
  woeId: number
}): Promise<GetWeatherResponse> => {
  return axios.get(`/weather-api-host/api/location/${woeId.toString()}`)
}

import axios from 'axios'
import { GetWeatherResponse, SearchLocationResponse } from '../types/weather'

interface SearchLocationParams {
  queryType: 'text' | 'lattlong'
  queryString?: string
}

export const searchLocation = async ({
  queryType,
  queryString,
}: SearchLocationParams): Promise<SearchLocationResponse> => {
  const queryKey = queryType === 'text' ? 'query' : 'lattlong'
  const { data } = await axios.get(
    `http://localhost:3000/api/location/search/?${queryKey}=${queryString}`
  )
  return data
}

export const getWeather = async ({
  woeid,
}: {
  woeid: number
}): Promise<GetWeatherResponse> => {
  const { data } = await axios.get(
    `http://localhost:3000/api/location/${woeid}`
  )
  return data
}

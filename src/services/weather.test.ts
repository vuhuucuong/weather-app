import axios from 'axios'
import { mocked } from 'ts-jest/utils'
import { getWeather, searchLocation } from './weather'
import { searchResponse, weatherListResponse } from '../stubs/weather'

jest.mock('axios')
const mockedAxios = mocked(axios, true)

it('should fetch location data with both queryType', async () => {
  mockedAxios.get.mockResolvedValue({ data: searchResponse })
  const data1 = await searchLocation({ queryType: 'text', queryString: 'ho' })
  expect(data1).toEqual(searchResponse)
  const data2 = await searchLocation({
    queryType: 'lattlong',
    queryString: '100,1212',
  })
  expect(data2).toEqual(searchResponse)
})

it('should fetch weather data', async () => {
  mockedAxios.get.mockResolvedValue({ data: weatherListResponse })
  const data = await searchLocation({ queryType: 'text', queryString: 'ho' })
  expect(data).toEqual(weatherListResponse)
})

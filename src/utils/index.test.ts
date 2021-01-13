import MockDate from 'mockdate'
import { formatTemp, getCurrentDayWeather, transformWeatherResponse } from '.'
import { transformedWeatherList, weatherListResponse } from '../stubs/weather'

afterAll(() => {
  MockDate.reset()
})

describe('formatTemp', () => {
  it('should run correctly', () => {
    expect(formatTemp(12.12131)).toBe('12')
  })
})

describe('getCurrentDayWeather', () => {
  MockDate.set('2021-01-13')
  it('should run correctly', () => {
    expect(getCurrentDayWeather(transformedWeatherList)).toEqual(
      transformedWeatherList[0]
    )
  })
  MockDate.set('2022-01-13')
  it('should return correctly when current day not in list', () => {
    expect(getCurrentDayWeather(transformedWeatherList)).toEqual(
      transformedWeatherList[0]
    )
  })

  it('should return correctly when list is empty', () => {
    expect(getCurrentDayWeather([])).toBeNull()
  })
})

describe('transformWeatherResponse', () => {
  it('should run correctly', () => {
    expect(transformWeatherResponse(weatherListResponse)).toEqual(
      transformedWeatherList
    )
  })
  it('should return empty list when error', () => {
    expect(
      transformWeatherResponse({
        ...weatherListResponse,
        consolidated_weather: null,
      } as any)
    ).toEqual([])
  })
})

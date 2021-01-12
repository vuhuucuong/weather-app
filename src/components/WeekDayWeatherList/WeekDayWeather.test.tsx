import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { transformedWeatherList } from '../../stubs/weather'
import WeekDayWeatherList from './WeekDayWeatherList'

it('should match snapshot', () => {
  const tree = renderer
    .create(
      <WeekDayWeatherList
        weatherInfoList={transformedWeatherList}
        selectedWeather={transformedWeatherList[0]}
        setSelectedWeather={jest.fn()}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(
    <WeekDayWeatherList
      weatherInfoList={transformedWeatherList}
      selectedWeather={transformedWeatherList[0]}
      setSelectedWeather={jest.fn()}
    />
  )
  expect(screen.getAllByTestId('weekdayItem')).toHaveLength(
    transformedWeatherList.length
  )
})

it('able to click a item without crashing', () => {
  render(
    <WeekDayWeatherList
      weatherInfoList={transformedWeatherList}
      selectedWeather={transformedWeatherList[0]}
      setSelectedWeather={jest.fn()}
    />
  )
  fireEvent.click(screen.getAllByTestId('weekdayItem')[0])
})

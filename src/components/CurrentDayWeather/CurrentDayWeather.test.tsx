import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { transformedWeatherList } from '../../stub/weather'
import CurrentDayWeather from './CurrentDayWeather'

it('should match snapshot', () => {
  const tree = renderer
    .create(
      <CurrentDayWeather weatherInfoCurrentDay={transformedWeatherList[0]} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(
    <CurrentDayWeather weatherInfoCurrentDay={transformedWeatherList[0]} />
  )
  expect(
    screen.getByText(transformedWeatherList[0].weatherStateName)
  ).toBeInTheDocument()
})

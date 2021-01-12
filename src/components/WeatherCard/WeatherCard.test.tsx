import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import WeatherCard from './WeatherCard'

it('should match snapshot', () => {
  const tree = renderer
    .create(
      <WeatherCard>
        <div>hi</div>
      </WeatherCard>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(
    <WeatherCard>
      <div>hi</div>
    </WeatherCard>
  )
})

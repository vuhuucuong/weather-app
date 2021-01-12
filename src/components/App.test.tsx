import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { searchResponse, weatherListResponse } from '../stub/weather'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App'

const server = setupServer(
  rest.get('/api/location/search/*', (req, res, ctx) => {
    return res(ctx.json(searchResponse))
  }),
  rest.get('/api/location/*', (req, res, ctx) => {
    return res(ctx.json(weatherListResponse))
  })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('should match snapshot', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(<App />)
  expect(
    screen.getByText('Please enter a city name to search')
  ).toBeInTheDocument()
})

it('can search for a location and show data', async () => {
  render(<App />)
  fireEvent.change(screen.getByTestId('searchInput'), {
    target: { value: 'test' },
  })
  expect((screen.getByTestId('searchInput') as HTMLInputElement).value).toBe(
    'test'
  )
  await screen.findAllByTestId('dropDownItem')
  expect(screen.getAllByTestId('dropDownItem')).toHaveLength(
    searchResponse.length
  )
  fireEvent.click(screen.getByText(searchResponse[0].title))
  await screen.findByTestId('currentDayWeather')
})

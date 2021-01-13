import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { searchResponse, weatherListResponse } from '../../stubs/weather'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import SearchBar from './SearchBar'

jest.useFakeTimers()
jest.mock('lodash.debounce', () => (fn: any) => fn)

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
  const tree = renderer
    .create(<SearchBar setIsLoading={jest.fn()} setListWeathers={jest.fn()} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(<SearchBar setIsLoading={jest.fn()} setListWeathers={jest.fn()} />)
})

it('able to search and click on result', async () => {
  render(<SearchBar setIsLoading={jest.fn()} setListWeathers={jest.fn()} />)
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
  await screen.findAllByTestId('dropDownItem')
  expect(screen.getAllByTestId('dropDownItem')).toHaveLength(
    searchResponse.length
  )
  fireEvent.click(screen.getByText(searchResponse[0].title))
  // remove li list after select
  expect(screen.queryAllByTestId('dropDownItem')).toHaveLength(0)
})

it('should not crash when fail network', async () => {
  server.use(
    rest.get('/api/location/search/*', () => {
      throw Error('Network error')
    }),
    rest.get('/api/location/*', () => {
      throw Error('Network error')
    })
  )
  render(<SearchBar setIsLoading={jest.fn()} setListWeathers={jest.fn()} />)
  fireEvent.change(screen.getByTestId('searchInput'), {
    target: { value: 'test' },
  })
  expect((screen.getByTestId('searchInput') as HTMLInputElement).value).toBe(
    'test'
  )
  await screen.findByTestId('spinner')
  await waitFor(() => {
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})

it('should not crash when click ul', async () => {
  render(<SearchBar setIsLoading={jest.fn()} setListWeathers={jest.fn()} />)
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
  fireEvent.click(screen.getByTestId('dropDown'))
  // remove li list after select
  expect(screen.queryAllByTestId('dropDownItem')).toHaveLength(
    searchResponse.length
  )
})

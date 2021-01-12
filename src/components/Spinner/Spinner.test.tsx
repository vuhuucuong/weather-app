import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Spinner from './Spinner'

it('should match snapshot', () => {
  expect(renderer.create(<Spinner />).toJSON()).toMatchSnapshot()
  expect(
    renderer.create(<Spinner className="mb-0" size={10} />).toJSON()
  ).toMatchSnapshot()
})

it('renders without crashing', () => {
  render(<Spinner className="mb-0" size={10} />)
})

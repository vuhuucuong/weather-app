import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import debounce from 'lodash.debounce'
import { searchLocation, getWeather } from '../../services/weather'
import { SearchLocationResponse, WeatherInfo } from '../../types/weather'
import { transformWeatherResponse } from '../../utils'
import Spinner from '../Spinner'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  setListWeathers: React.Dispatch<React.SetStateAction<WeatherInfo[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  setListWeathers,
  setIsLoading,
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [cityOptions, setCityOptions] = useState<SearchLocationResponse>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const debouncedFetchLocationList = useMemo(
    () =>
      debounce(async (searchValue: string) => {
        try {
          if (searchValue.trim() !== '') {
            setIsSearching(true)
            const data = await searchLocation({
              queryType: 'text',
              queryString: searchValue.trim(),
            })
            setCityOptions(data)
            return data
          }
        } catch {
          setCityOptions([])
        } finally {
          setIsSearching(false)
        }
      }, 300),
    []
  )

  useEffect(() => {
    debouncedFetchLocationList(searchValue)
  }, [searchValue, debouncedFetchLocationList])

  const delegatedHandleClick = async (e: any) => {
    try {
      // disable if not <li /> clicked
      if (e.target.getAttribute('data-element-type') === 'dropDown') {
        return
      }
      const selectedWoeid = e.target.getAttribute('data-woeid')
      setCityOptions([])
      setIsLoading(true)
      setSearchValue('')
      const data = await getWeather({ woeid: selectedWoeid })
      const transformedWeatherList = transformWeatherResponse(data)
      setListWeathers(transformedWeatherList)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-100 position-relative">
      <div className="input-group">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="form-control"
          list="cityDataList"
          id="searchInput"
          data-testid="searchInput"
          placeholder="Enter city name..."
        />
        {isSearching && (
          <span className="input-group-text">
            <Spinner size={20} />
          </span>
        )}
      </div>
      <ul
        className={cx(
          'list-group w-100 position-absolute overflow-auto',
          styles.dropDown
        )}
        data-testid="dropDown"
        data-element-type="dropDown"
        onClick={delegatedHandleClick}
      >
        {cityOptions.map(({ title, woeid }) => {
          return (
            <li
              data-testid="dropDownItem"
              className={cx('list-group-item', styles.itemDropDown)}
              key={woeid}
              data-woeid={woeid}
            >
              {title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchBar

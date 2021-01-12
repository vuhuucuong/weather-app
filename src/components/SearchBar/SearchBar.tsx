import React from 'react'

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="w-100">
      <input
        className="form-control"
        list="cityDataList"
        id="searchInput"
        placeholder="Type to search..."
      />
      <datalist id="cityDataList">
        <option value="San Francisco" />
        <option value="New York" />
        <option value="Seattle" />
        <option value="Los Angeles" />
        <option value="Chicago" />
      </datalist>
    </div>
  )
}

export default SearchBar

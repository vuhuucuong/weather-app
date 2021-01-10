import React from 'react'
import styles from './App.module.css'
import cx from 'classnames'
import SelectedDayInfo from './SelectedDayInfo'

function App() {
  return (
    <div className={styles.appWrapper}>
      <div
        className={cx(
          'text-light p-4 border-0 shadow-sm',
          styles.dayWeatherCard
        )}
      >
        <SelectedDayInfo />
      </div>
    </div>
  )
}

export default App

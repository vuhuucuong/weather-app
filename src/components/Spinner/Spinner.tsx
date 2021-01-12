import React from 'react'
import cx from 'classnames'

interface SpinnerProps {
  className?: string
  size?: number
}

const Spinner: React.FC<SpinnerProps> = ({ className, size = 20 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={cx('spinner-border', className)}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner

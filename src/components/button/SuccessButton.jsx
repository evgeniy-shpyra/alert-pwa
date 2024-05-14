import React from 'react'
import styles from './button.module.scss'
import cn from 'classnames'

const SuccessButton = ({ children, onClick }) => {
  const handleClick = () => {
    onClick && onClick()
  }
  const classes = cn(styles.button, styles.success)
  return (
    <button onClick={handleClick} className={classes}>
      {children}
    </button>
  )
}

export default SuccessButton

import React from 'react'
import styles from './button.module.scss'

const Button = ({ children, onClick }) => {
  const handleClick = () => {
    onClick && onClick()
  }
  return (
    <button onClick={handleClick} className={styles.button}>
      {children}
    </button>
  )
}

export default Button

import React from 'react'
import styles from './input.module.scss'

const Input = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value)
  }
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={styles.input}
      type='text'
    />
  )
}

export default Input

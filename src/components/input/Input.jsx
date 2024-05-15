import React from 'react'
import styles from './input.module.scss'

const Input = ({ value, onChange, placeholder, type }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value)
  }
  const inputType = type ? type : 'text'
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={styles.input}
      type={inputType}
    />
  )
}

export default Input

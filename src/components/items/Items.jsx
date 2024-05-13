import React from 'react'
import styles from './items.module.scss'

const Items = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Items

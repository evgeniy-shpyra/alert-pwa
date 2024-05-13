import React from 'react'
import styles from './pageWrapper.module.scss'

const PageWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default PageWrapper

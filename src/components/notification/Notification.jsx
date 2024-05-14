import React from 'react'
import { createPortal } from 'react-dom'
import styles from './notification.module.scss'
import cn from 'classnames'

const Notification = ({ type, title, text }) => {
  const classes = cn(styles.container, {
    [styles.success]: type === 'success',
    [styles.error]: type === 'error',
  })
  return createPortal(
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
    </div>,
    document.body
  )
}

export default Notification

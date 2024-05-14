import React from 'react'
import styles from './tag.module.scss'
import cn from 'classnames'

const Tag = ({ type, text }) => {
  const classes = cn(styles.tag, {
    [styles.success]: type === 'success',
    [styles.error]: type === 'error',
  })
  return <div className={classes}>{text}</div>
}

export default Tag

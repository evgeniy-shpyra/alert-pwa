import React from 'react'
import styles from './switch.module.scss'
import cn from 'classnames'

const Switch = ({ isActive, addClass, onClick, isLock }) => {
  const handlerClick = () => {
    onClick && onClick()
  }

  const classes = cn(styles.background, addClass, {
    [styles.on]: isActive === true,
    [styles.off]: isActive === false,
    [styles.lock]: isLock,
  })

  return <div onClick={handlerClick} className={classes}></div>
}

export default Switch

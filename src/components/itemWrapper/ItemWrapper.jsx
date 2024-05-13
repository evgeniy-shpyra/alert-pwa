import React from 'react'
import styles from './itemWrapper.module.scss'
import WifiOffIcon from '../../icons/WifiOffIcon'
import WifiOnIcon from '../../icons/WifiOnIcon'
import cn from 'classnames'
import SettingsIcon from '../../icons/SettingsIcon'

const ItemWrapper = ({ children, name, isOnline, onSettingsClick }) => {
  const contentClasses = cn(styles.content, { [styles.lock]: !isOnline })

  return (
    <div className={styles.container}>
      <div className={contentClasses}>{children}</div>
      <div onClick={onSettingsClick} className={styles.settings}>
        <SettingsIcon />
      </div>
      <div className={styles.label}>
        {isOnline ? <WifiOnIcon /> : <WifiOffIcon />}
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}

export default ItemWrapper

import React from 'react'
import styles from './itemWrapper.module.scss'
import WifiOffIcon from '../../icons/WifiOffIcon'
import WifiOnIcon from '../../icons/WifiOnIcon'
import cn from 'classnames'
import SettingsIcon from '../../icons/SettingsIcon'

const ItemWrapper = ({
  children,
  name,
  isOnline,
  isDanger,
  onSettingsClick,
  isEmpty,
  onClick,
}) => {
  if (isEmpty) {
    return (
      <div onClick={onClick} className={`${styles.container} ${styles.empty} `}>
        {children}
      </div>
    )
  }

  const contentClasses = cn(styles.content, {
    [styles.lock]: !isOnline,
  })
  const containerClasses = cn(styles.container, {
    [styles.danger]: isDanger,
  })
  return (
    <div onClick={onClick} className={containerClasses}>
      <div className={contentClasses}>{children}</div>
      <div onClick={onSettingsClick} className={styles.settings}>
        <SettingsIcon />
      </div>
      <div className={styles.label}>
        {isOnline === true && <WifiOnIcon />}
        {isOnline === false && <WifiOffIcon />}
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}

export default ItemWrapper

import React from 'react'
import styles from './itemWrapper.module.scss'
import WifiOffIcon from '../../icons/WifiOffIcon'
import WifiOnIcon from '../../icons/WifiOnIcon'
import cn from 'classnames'
import SettingsIcon from '../../icons/SettingsIcon'
import PlusIcon from '../../icons/PlusIcon'

const ItemWrapper = ({
  children,
  name,
  isOnline,
  isDanger,
  onSettingsClick,
  onDeleteClick,
  isEmpty,
  onClick,
  isLock
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
    [styles.lock]: isLock,
  })

  const handleBtnClick = () => {
    if (onSettingsClick) {
      onSettingsClick()
    } else if (onDeleteClick) {
      onDeleteClick()
    }
  }

  return (
    <div onClick={onClick} className={containerClasses}>
      <div className={contentClasses}>{children}</div>
      {onSettingsClick && (
        <div onClick={handleBtnClick} className={styles.settings}>
          <SettingsIcon />
        </div>
      )}
      {onDeleteClick && (
        <div onClick={handleBtnClick} className={styles.delete}>
          <PlusIcon color="#cc1414" size={23} />
        </div>
      )}

      <div className={styles.label}>
        {isOnline === true && <WifiOnIcon />}
        {isOnline === false && <WifiOffIcon />}
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}

export default ItemWrapper

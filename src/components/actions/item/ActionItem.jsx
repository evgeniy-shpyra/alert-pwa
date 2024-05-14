import React from 'react'
import styles from './actionItem.module.scss'
import Tag from '../../tag/Tag'
import SettingsIcon from '../../../icons/SettingsIcon'
import SettingsWriteAgent from './settingsAction/SettingsAction'
import PlusIcon from '../../../icons/PlusIcon'
import cn from 'classnames'

export const AddActionBtn = ({ onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.container} ${styles.add}`}>
      <PlusIcon />
    </div>
  )
}

const ActionItem = ({ name, id, isActive }) => {
  const [isOpenSettings, setIsOpenSettings] = React.useState(false)

  const handleSettingsClick = () => {
    setIsOpenSettings(true)
  }

  const containerClasses = cn(styles.container, { [styles.active]: isActive })
  return (
    <div className={containerClasses}>
      <div onClick={handleSettingsClick} className={styles.settingsContainer}>
        <SettingsIcon />
      </div>
      <div className={styles.tagContainer}>
        {!isActive ? (
          <Tag text='Не активна' type='success' />
        ) : (
          <Tag text='Активна' type='error' />
        )}
      </div>
      <div className={styles.name}>{name}</div>
      {isOpenSettings && (
        <SettingsWriteAgent
          onClose={() => setIsOpenSettings(false)}
          action={{ name, id }}
        />
      )}
    </div>
  )
}

export default ActionItem

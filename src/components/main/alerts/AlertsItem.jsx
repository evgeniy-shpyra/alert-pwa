import React from 'react'
import styles from './alerts.module.scss'

const AlertsItem = ({ name, lastTime, isActive }) => {
  return (
    <div className={styles.item}>
      <div className={styles.column_left}>
        <div className={styles.name}>{name}</div>
        <div className={styles.last_time}>{lastTime}</div>
      </div>
      <div className={styles.column_right}>
        <div className={`${styles.status} ${isActive ? styles.active : ''}`}>
          Активна
        </div>
        <button className={`${styles.button} ${isActive ? styles.active : ''}`}>
          {isActive ? 'Вимкнути' : 'Увімкнути'}
        </button>
      </div>
    </div>
  )
}

export default AlertsItem

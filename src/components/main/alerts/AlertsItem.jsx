import React from 'react'
import styles from './alerts.module.scss'

const AlertsItem = ({ name, lastTime, status }) => {
  return (
    <div className={styles.item}>
      <div className={styles.column_left}>
        <div className={styles.name}>{name}</div>
        <div className={styles.last_time}>{lastTime}</div>
      </div>
      <div className={styles.column_right}>
        <div className={`${styles.status} ${status ? styles.active : ''}`}>
          
          {status ? 'Активна' : 'Не активна'}
        </div>
        <button className={`${styles.button} ${status ? styles.active : ''}`}>
          {status ? 'Вимкнути' : 'Увімкнути'}
        </button>
      </div>
    </div>
  )
}

export default AlertsItem

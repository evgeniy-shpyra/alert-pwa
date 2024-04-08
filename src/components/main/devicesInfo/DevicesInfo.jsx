import React from 'react'
import styles from './devicesInfo.module.scss'

const DevicesInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>Пристрої</div>
      </div>
      <div className={styles.content}>
        <div className={styles.count}>10 пристроїв</div>
        <div className={styles.infoOnline}>8 online</div>
        <div className={styles.infoOffline}>2 offline</div>
      </div>
    </div>
  )
}

export default DevicesInfo

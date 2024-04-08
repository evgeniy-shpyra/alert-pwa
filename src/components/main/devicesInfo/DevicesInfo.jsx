import React, { useState } from 'react'
import styles from './devicesInfo.module.scss'
import { useSelector } from 'react-redux'
const DevicesInfo = () => {
  const devices = useSelector((state) => state.device.devices)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>Пристрої</div>
      </div>
      <div className={styles.content}>
        <div className={styles.count}>{devices.length} пристроїв</div>
        <div className={styles.infoOnline}>
          {devices.filter((d) => d.isOnline).length} online
        </div>
        <div className={styles.infoOffline}>
          {devices.filter((d) => !d.isOnline).length} offline
        </div>
      </div>
    </div>
  )
}

export default DevicesInfo

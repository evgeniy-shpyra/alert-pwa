import React, { useState } from 'react'
import styles from './devicesInfo.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DevicesInfo = () => {
  const navigate = useNavigate()

  const devices = useSelector((state) => state.device.devices)
  const [count, setCount] = React.useState(devices.length)
  const [onlineCount, setOnlineCount] = React.useState(
    devices.filter((d) => d.isOnline).length
  )

  React.useEffect(() => {
    setCount(devices.length)
    setOnlineCount(devices.filter((d) => d.isOnline).length)
  }, [devices])

  const handleClickOnContainer = () => {
    navigate('/device')
  }

  return (
    <div onClick={handleClickOnContainer} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>Пристрої</div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.infoOnline}>{onlineCount} online</div>
          <div className={styles.infoOffline}>
            {count - onlineCount} offline
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevicesInfo

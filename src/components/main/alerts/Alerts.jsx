import React from 'react'
import styles from './alerts.module.scss'
import AlertsItem from './AlertsItem.jsx'

const data = [
  { id: 1, name: 'Повітряна тривога', lastTime: '07.04 4.52', isActive: true },
  { id: 2, name: 'Хімічна небезпека', lastTime: '07.04 4.52', isActive: false },
  { id: 3, name: 'Радіаційна небезпека', lastTime: '', isActive: false },
]

const Alerts = () => {
  return (
    <div className={styles.alerts}>
      {data.map((item) => (
        <AlertsItem
          key={item.id}
          name={item.name}
          lastTime={item.lastTime}
          isActive={item.isActive}
        />
      ))}
    </div>
  )
}

export default Alerts

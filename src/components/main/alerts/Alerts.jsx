import React from 'react'
import styles from './alerts.module.scss'
import AlertsItem from './AlertsItem.jsx'
import { useSelector } from 'react-redux'


const Alerts = () => {
  const actions = useSelector((state) => state.action.actions)

  return (
    <div className={styles.alerts}>
      {actions.map((item) => (
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

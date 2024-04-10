import React from 'react'
import Alerts from '../../components/main/alerts/Alerts'
import DevicesInfo from '../../components/main/devicesInfo/DevicesInfo'
import HistoryInfo from '../../components/main/historyInfo/HistoryInfo'
import styles from './mainPage.module.scss'

const MainPage = () => {
  

  return (
    <main className={styles.wrapper}>
      <div className={styles.title}>Меню</div>
      <div className={styles.content}>
        <div className={styles.infoBlock}>
          <DevicesInfo />
          <HistoryInfo />
        </div>
        <Alerts />
      </div>
    </main>
  )
}

export default MainPage

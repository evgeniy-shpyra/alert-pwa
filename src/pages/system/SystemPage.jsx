import { useDispatch, useSelector } from 'react-redux'
import Switch from '../../components/switch/Switch'
import styles from './systemPage.module.scss'
import React from 'react'
import Loading from '../../components/loading/Loading'
import {
  changeSystemStatus,
  pingSystem,
} from '../../redux/features/systemSlice'
import { resetSensorStatuses } from '../../redux/features/sensorSlice'

const SystemPage = () => {
  const dispatch = useDispatch()
  const systemStatus = useSelector((state) => state.system.status)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleToggleSystem = async () => {
    setIsLoading(true)
    dispatch(resetSensorStatuses())
    await dispatch(changeSystemStatus(!systemStatus))
    setIsLoading(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.name}>Вимкнути систему</div>

          <Switch isActive={systemStatus} onClick={handleToggleSystem} />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  )
}

export default SystemPage

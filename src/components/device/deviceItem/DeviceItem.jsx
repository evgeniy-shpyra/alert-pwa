import React from 'react'
import styles from './deviceItem.module.scss'
import ItemWrapper from '../../itemWrapper/ItemWrapper'
import Switch from '../../switch/Switch'
import { useDispatch } from 'react-redux'
import { changeDeviceStatus } from '../../../redux/features/deviceSlice'
import ModalWindow from '../../modalWindow/ModalWindow'
import AddingDevice from '../addingDevice/AddingDevice'

const DeviceItem = ({ name, id, status }) => {
  const dispatch = useDispatch()
  const [isLock, setIsLock] = React.useState(false)
  const [isSettings, setIsSettings] = React.useState(false)

  const handleToggleStatus = async () => {
    setIsLock(true)
    await dispatch(changeDeviceStatus(id))
    setIsLock(false)
  }

  const handleSettingsClick = () => {
    setIsSettings(true)
  }

  const handleCloseModal = () => {
    setIsSettings(false)
  }

  return (
    <ItemWrapper
      name={name}
      isOnline={status !== null}
      onSettingsClick={handleSettingsClick}
    >
      <div className={styles.switchWrapper}>
        <Switch
          isLock={isLock}
          onClick={handleToggleStatus}
          isActive={status}
        />
      </div>

     
    </ItemWrapper>
  )
}

export default DeviceItem

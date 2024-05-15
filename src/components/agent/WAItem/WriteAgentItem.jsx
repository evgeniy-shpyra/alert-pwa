import React from 'react'
import styles from './writeAgentItem.module.scss'
import ItemWrapper from '../../itemWrapper/ItemWrapper'
import Switch from '../../switch/Switch'
import { useDispatch } from 'react-redux'
import {
  changeDeviceStatus,
  deleteDevice,
} from '../../../redux/features/deviceSlice'
import ConfirmWindow from '../../confirmWindow/ConfirmWindow'
import Notification from '../../notification/Notification'

const WriteAgentItem = ({ name, id, status }) => {
  const [error, setError] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const handleSetError = (text) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setError(text)
    timeoutRef.current = setTimeout(() => {
      setError(null)
      timeoutRef.current = null
    }, 5000)
  }

  const dispatch = useDispatch()
  const [isLock, setIsLock] = React.useState(false)
  const [isLoadingDeleting, setIsLoadingDeleting] = React.useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false)

  const handleToggleStatus = async () => {
    setIsLock(true)
    await dispatch(changeDeviceStatus(id))
    setIsLock(false)
  }

  const handleDelete = async () => {
    setIsLoadingDeleting(true)
    const response = await dispatch(deleteDevice(id))
    setIsLoadingDeleting(false)
    if (response.error) {
      handleSetError('Не вдалося видалити пристрій виконання')
      return
    }
    setIsOpenConfirm(false)
  }

  return (
    <ItemWrapper
      name={name}
      isOnline={status !== null}
      onDeleteClick={() => setIsOpenConfirm(true)}
      isLock={isLock}
    >
      <div className={styles.switchWrapper}>
        <Switch onClick={handleToggleStatus} isActive={status} />
      </div>
      {isOpenConfirm && (
        <ConfirmWindow
          onClose={() => setIsOpenConfirm(false)}
          isLoading={isLoadingDeleting}
          onClick={handleDelete}
          text='Видатити пристій виконання?'
          buttonText='Видалити'
        ></ConfirmWindow>
      )}
      {error && <Notification type='error' title='Помилка' text={error} />}
    </ItemWrapper>
  )
}

export default WriteAgentItem

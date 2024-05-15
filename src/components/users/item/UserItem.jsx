import React from 'react'
import styles from './userItem.module.scss'
import PlusIcon from '../../../icons/PlusIcon'
import ConfirmWindow from '../../confirmWindow/ConfirmWindow'
import Notification from '../../notification/Notification'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../../redux/features/userSlice'

export const AddUserBtn = ({ onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.container} ${styles.add}`}>
      <PlusIcon />
    </div>
  )
}

const UserItem = ({ login, id }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
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

  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const response = await dispatch(deleteUser(id))
    setIsLoading(false)
    if (response.error) {
      handleSetError('Не вдалося видалити користувача')
      return
    }
    setIsOpenConfirm(false)
  }

  // const containerClasses = cn(styles.container, { [styles.active]: isActive })
  return (
    <div className={styles.container}>
      <div className={styles.name}>{login}</div>
      <div
        onClick={() => setIsOpenConfirm(true)}
        className={styles.deleteContainer}
      >
        <PlusIcon size={23} color="#cc1414"/>
      </div>
      {isOpenConfirm && (
        <ConfirmWindow
          onClose={() => setIsOpenConfirm(false)}
          isLoading={isLoading}
          onClick={handleDelete}
          text='Видатити користувача?'
          buttonText='Видалити'
        ></ConfirmWindow>
      )}
      {error && <Notification type='error' title='Помилка' text={error} />}
    </div>
  )
}

export default UserItem

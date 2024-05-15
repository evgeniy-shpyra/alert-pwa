import React from 'react'
import styles from './readAgentSettings.module.scss'
import ModalWindow from '../../modalWindow/ModalWindow'
import Tag from '../../tag/Tag'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmWindow from '../../confirmWindow/ConfirmWindow'
import PlusIcon from '../../../icons/PlusIcon'
import { deleteSensor } from '../../../redux/features/sensorSlice'
import Loading from '../../loading/Loading'
import Notification from '../../notification/Notification'

const ReadAgentSettings = ({ onClose, status, actionId, name, id }) => {
  const dispatch = useDispatch()
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

  const [action, setAction] = React.useState({ name: '', status: false })
  const actions = useSelector((state) => state.action.actions)

  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false)
  const [isLoadingDeleting, setIsLoadingDeleting] = React.useState(false)

  React.useEffect(() => {
    const action = actions.find((a) => a.id === actionId)
    setAction(action)
  }, [])

  const handleDelete = async () => {
    setIsOpenConfirm(false)
    setIsLoadingDeleting(true)
    const response = await dispatch(deleteSensor(id))
    setIsLoadingDeleting(false)
    if (response.error) {
      handleSetError('Не вдалося видалити сенсор')
      return
    }
    onClose()
  }

  let tagText = 'text'
  let tagType = ''

  switch (status) {
    case true:
      tagType = 'error'
      tagText = 'Активний'
      break
    case false:
      tagType = 'success'
      tagText = 'Не активний'
      break
    default:
      tagType = 'default'
      tagText = 'Не відомо'
  }
  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.nameContainer}>
            {name}
            <div className={styles.tagContainer}>
              <Tag type={tagType} text={tagText} />
            </div>
          </div>
          <div
            onClick={() => setIsOpenConfirm(true)}
            className={styles.removerContainer}
          >
            <PlusIcon color='#cc1414' />
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.name}>{action.name}</div>
          <div className={styles.tagContainer}>
            {action.status ? (
              <Tag text='Активна' type='error' />
            ) : (
              <Tag text='Не активна' type='success' />
            )}
          </div>
        </div>
      </div>
      {isOpenConfirm && (
        <ConfirmWindow
          onClose={() => setIsOpenConfirm(false)}
          onClick={handleDelete}
          text='Видатити сенсор?'
          buttonText='Видалити'
        />
      )}
      {isLoadingDeleting && <Loading />}
      {error && <Notification type='error' title='Помилка' text={error} />}
    </ModalWindow>
  )
}

export default ReadAgentSettings

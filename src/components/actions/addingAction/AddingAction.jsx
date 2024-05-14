import React from 'react'
import styles from './addingAction.module.scss'
import ModalWindow from '../../modalWindow/ModalWindow'
import Input from '../../input/Input'
import SuccessButton from '../../button/SuccessButton'
import Notification from '../../notification/Notification'
import { useDispatch } from 'react-redux'
import { createAction, fetchActions } from '../../../redux/features/actionSlice'

const AddingAction = ({ onClose }) => {
  const dispatch = useDispatch()
  const [error, setError] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const handleSetError = (title) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setError(title)
    timeoutRef.current = setTimeout(() => {
      setError(null)
      timeoutRef.current = null
    }, 5000)
  }

  const [name, setName] = React.useState('')

  const handleSave = async () => {
    if (!name) {
      handleSetError('Заповніть всі поля')
      return
    }
    const response = await dispatch(createAction(name))

    if (response && response.error) {
      handleSetError('Не вдалося додати надзвичайну ситуацію')
      return
    }
    dispatch(fetchActions())
    onClose()
  }

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.title}>Додаваннтя надзвичайної ситуації</div>
        <Input value={name} onChange={setName} placeholder='Назва' />
        <div className={styles.btnContainer}>
          <SuccessButton onClick={handleSave}>Зберегти</SuccessButton>
        </div>
      </div>
      {error && <Notification type='error' title='Помилка' text={error} />}
    </ModalWindow>
  )
}

export default AddingAction

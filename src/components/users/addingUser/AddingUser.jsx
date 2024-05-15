import React from 'react'
import styles from './addingUser.module.scss'
import ModalWindow from '../../modalWindow/ModalWindow'
import Input from '../../input/Input'
import SuccessButton from '../../button/SuccessButton'
import Notification from '../../notification/Notification'
import { useDispatch } from 'react-redux'
import { createUser, fetchUsers } from '../../../redux/features/userSlice'

const AddingUser = ({ onClose }) => {
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

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSave = async () => {
    if (!login || !password) {
      handleSetError('Заповніть всі поля')
      return
    }
    const response = await dispatch(createUser({ login, password }))

    if (response && response.error) {
      handleSetError('Не вдалося створити користувача')
      return
    }
    dispatch(fetchUsers())
    onClose()
  }

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.title}>Додаваннтя користувача</div>
        <div className={styles.inputs}>
          <Input value={login} onChange={setLogin} placeholder='Логін' />
          <Input value={password} onChange={setPassword} placeholder='Пароль' />
        </div>
        <div className={styles.btnContainer}>
          <SuccessButton onClick={handleSave}>Зберегти</SuccessButton>
        </div>
      </div>
      {error && <Notification type='error' title='Помилка' text={error} />}
    </ModalWindow>
  )
}

export default AddingUser

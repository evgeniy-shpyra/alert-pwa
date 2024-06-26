// import React from 'react'
import React from 'react'
import SuccessButton from '../../components/button/SuccessButton'
import Input from '../../components/input/Input'
import styles from './loginPage.module.scss'
import Notification from '../../components/notification/Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()
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

  const handleLogin = async () => {
    if (!login.length || !password.length) {
      handleSetError('Заповніть всі поля')
      return
    }

    const response = await dispatch(loginUser({ login, password }))
    if (response.error) {
      handleSetError('Не вірні дані для входу')
      return
    }
    navigate('/')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Авторизація</div>
        <div className={styles.inputs}>
          <Input value={login} onChange={setLogin} placeholder='Логін' />
          <Input value={password} onChange={setPassword} placeholder='Пароль' />
        </div>
        <div className={styles.btnContainer}>
          <SuccessButton onClick={handleLogin}>Увійти</SuccessButton>
        </div>
      </div>
      {error && <Notification type='error' title='Помилка' text={error} />}
    </div>
  )
}

export default LoginPage

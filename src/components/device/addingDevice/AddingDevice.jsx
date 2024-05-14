import React from 'react'
import styles from './addingDevice.module.scss'
import Input from '../../input/Input'
import Button from '../../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWifiNetworks,
  saveAgentData,
  toggleConnectedToDevice,
} from '../../../redux/features/systemSlice'
import Loading from '../../loading/Loading'
import SuccessButton from '../../button/SuccessButton'
import { hubHostname } from '../../../api/hub'
import Notification from '../../notification/Notification'
import { createDevice } from '../../../redux/features/deviceSlice'

const ConnectedConfirm = ({ handleSetError }) => {
  const isLoading = useSelector((state) => state.system.agentLoading)

  const dispatch = useDispatch()

  const handleConnected = async () => {
    const response = await dispatch(fetchWifiNetworks())

    if (response.meta.rejectedWithValue) {
      handleSetError('Не вдалося зʼєднатися з присироєм')
    }
  }
  return (
    <div className={styles.confirmContainer}>
      <p className={styles.message}>Підєднайтеся до wifi мережі прилада</p>
      <Button onClick={handleConnected}>Підєднано</Button>
      {isLoading && <Loading />}
    </div>
  )
}
const DisconnectConfirm = ({
  onClose,
  newDeviceName,
  handleSetError,
  deviceType,
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConnected = async () => {
    setIsLoading(true)
    let response
    if (deviceType === 'write') {
      response = await dispatch(createDevice(newDeviceName))
    } else if (deviceType === 'read') {
      response = await dispatch(createDevice(newDeviceName))
    }

    setIsLoading(false)
    if (response && response.meta.rejectedWithValue) {
      handleSetError('Не вдалося зберегти дані на hub')
      return
    }
    onClose()
  }
  return (
    <div className={styles.confirmContainer}>
      <p className={styles.message}>Підєднайтеся до wifi мережі хабу</p>
      <Button onClick={handleConnected}>Підєднано</Button>
      {isLoading && <Loading />}
    </div>
  )
}

const AgentConfig = ({ onClose, handleSetError, deviceType }) => {
  const dispatch = useDispatch()
  const wifiNetworks = useSelector((state) => state.system.wifiNetworks)
  const isLoading = useSelector((state) => state.system.agentLoading)
  const [isSaved, setIsSaved] = React.useState(false)
  const selectorRef = React.useRef(null)

  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleClickBtn = async () => {
    const ssid = selectorRef.current.value

    if (!ssid || !ssid.length || !password.length || !name.length) {
      handleSetError('Заповніть всі поля')
      return
    }

    const response = await dispatch(
      saveAgentData({ name, password, ssid, hubIp: hubHostname })
    )
    if (response.meta.rejectedWithValue) {
      handleSetError('Не вдалося зберегти дані на пристрої')
      return
    }
    setIsSaved(true)
  }

  if (isSaved)
    return (
      <DisconnectConfirm
        onClose={onClose}
        newDeviceName={name}
        handleSetError={handleSetError}
        deviceType={deviceType}
      />
    )

  return (
    <div className={styles.configContainer}>
      <div className={styles.title}>Додаваннтя присторя виконання</div>
      <div className={styles.form}>
        <Input onChange={setName} value={name} placeholder='Назва пристороя' />
        <select ref={selectorRef}>
          <option disabled>SSID wifi</option>
          {wifiNetworks.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <Input
          onChange={setPassword}
          value={password}
          placeholder='Пароль від wifi'
        />
      </div>
      <SuccessButton onClick={handleClickBtn}>Зберегти</SuccessButton>
      {isLoading && <Loading />}
    </div>
  )
}

const AddingDevice = ({ onClose, deviceType }) => {
  const [error, setError] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const [step, setStep] = React.useState(1)


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

  const dispatch = useDispatch()
  const isConnectedToDevice = useSelector(
    (state) => state.system.isConnectedToDevice
  )

  React.useEffect(() => {
    dispatch(toggleConnectedToDevice(false))
    return () => toggleConnectedToDevice(false)
  }, [])

  return (
    <div className={styles.content}>
      
      {!isConnectedToDevice ? (
        <ConnectedConfirm handleSetError={handleSetError} />
      ) : (
        <AgentConfig
          onClose={onClose}
          handleSetError={handleSetError}
          deviceType={deviceType}
        />
      )}
      {error && <Notification type='error' title='Помилка' text={error} />}
    </div>
  )
}

export default AddingDevice

import React from 'react'
import styles from './addingAgent.module.scss'
import Input from '../../input/Input'
import Button from '../../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWifiNetworks,
  pingSystem,
  saveAgentData,
} from '../../../redux/features/systemSlice'
import Loading from '../../loading/Loading'
import SuccessButton from '../../button/SuccessButton'
import { hubHostname } from '../../../api/hub'
import Notification from '../../notification/Notification'
import { createDevice, fetchDevices } from '../../../redux/features/deviceSlice'
import { createSensor, fetchSensors } from '../../../redux/features/sensorSlice'

const ConnectedConfirm = ({ handleSetError, handleNextStep }) => {
  const isLoading = useSelector((state) => state.system.agentLoading)

  const dispatch = useDispatch()

  const handleConnected = async () => {
    const response = await dispatch(fetchWifiNetworks())
    if (response.meta.rejectedWithValue) {
      handleSetError('Не вдалося зʼєднатися з присироєм')
      return
    }
    handleNextStep()
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
  payload,
  handleSetError,
  deviceType,
  handleNextStep,
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConnected = async () => {
    setIsLoading(true)
    let response
    if (deviceType === 'write') {
      response = await dispatch(createDevice(payload.deviceName))
    } else if (deviceType === 'read') {
      response = await dispatch(
        createSensor({ name: payload.deviceName, actionId: payload.actionId })
      )
    }

    if (response && response.meta.rejectedWithValue) {
      setIsLoading(false)
      handleSetError('Не вдалося зберегти дані на hub')
      return
    }

    if (deviceType === 'write') {
      await dispatch(fetchDevices())
    } else if (deviceType === 'read') {
      await dispatch(fetchSensors())
    }

    await dispatch(pingSystem())
    setIsLoading(false)
    handleNextStep()
  }
  return (
    <div className={styles.confirmContainer}>
      <p className={styles.message}>Підєднайтеся до wifi мережі хабу</p>
      <Button onClick={handleConnected}>Підєднано</Button>
      {isLoading && <Loading />}
    </div>
  )
}

const AgentConfig = ({ handleSetError, handleNextStep, deviceType }) => {
  const dispatch = useDispatch()
  const wifiNetworks = useSelector((state) => state.system.wifiNetworks)
  const actions = useSelector((state) => state.action.actions)
  const isLoading = useSelector((state) => state.system.agentLoading)
  const ssidSelectRef = React.useRef(null)
  const actionIdSelectRef = React.useRef(null)

  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleClickBtn = async () => {
    const ssid = ssidSelectRef.current.value
    const actionId = actionIdSelectRef.current?.value

    if (
      !ssid ||
      !ssid.length ||
      !password.length ||
      !name.length ||
      (deviceType === 'read' && (!actionId || !actionId.length))
    ) {
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
    const payloadForHub = {
      deviceName: name,
    }
    if (deviceType === 'read') {
      payloadForHub.actionId = actionId
    }
    handleNextStep(payloadForHub)
  }

  return (
    <div className={styles.configContainer}>
      <div className={styles.title}>Додаваннтя присторя виконання</div>
      <div className={styles.form}>
        <Input onChange={setName} value={name} placeholder='Назва пристороя' />
        <select ref={ssidSelectRef}>
          <option value='' disabled='disabled' selected='selected'>
            SSID wifi
          </option>
          {wifiNetworks.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
        <Input
          onChange={setPassword}
          value={password}
          placeholder='Пароль від wifi'
        />
        {deviceType === 'read' && (
          <select ref={actionIdSelectRef}>
            <option value='' disabled='disabled' selected='selected'>
              Виберіть надзвичайну ситуацію
            </option>
            {actions.map(({name, id}) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
      </div>
      <SuccessButton onClick={handleClickBtn}>Зберегти</SuccessButton>
      {isLoading && <Loading />}
    </div>
  )
}

const AddingAgent = ({ onClose, deviceType }) => {
  const [error, setError] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const [step, setStep] = React.useState(1)
  const payloadRef = React.useRef(null)

  const handleNextStep = (payload = null) => {
    payloadRef.current = payload
    setStep((prevStep) => {
      if (prevStep < 3) return prevStep + 1
      onClose()
    })
  }

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

  return (
    <div className={styles.content}>
      {step === 1 && (
        <ConnectedConfirm
          handleSetError={handleSetError}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <AgentConfig
          handleSetError={handleSetError}
          handleNextStep={handleNextStep}
          deviceType={deviceType}
        />
      )}
      {step === 3 && (
        <DisconnectConfirm
          handleSetError={handleSetError}
          handleNextStep={handleNextStep}
          deviceType={deviceType}
          payload={payloadRef.current}
        />
      )}
      {error && <Notification type='error' title='Помилка' text={error} />}
    </div>
  )
}

export default AddingAgent

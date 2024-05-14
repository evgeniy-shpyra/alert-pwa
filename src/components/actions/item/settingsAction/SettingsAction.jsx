import React from 'react'
import styles from './settingsAction.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  bulkUpdateDevicesActions,
  fetchDevicesActions,
} from '../../../../redux/features/deviceActionSlice'
import Loading from '../../../loading/Loading'
import Switch from '../../../switch/Switch'
import ModalWindow from '../../../modalWindow/ModalWindow'
import LinkIcon from '../../../../icons/LinkIcon'
import UnlinkIcon from '../../../../icons/UnlinkIcon'
import cn from 'classnames'
import SuccessButton from '../../../button/SuccessButton'
import Notification from '../../../notification/Notification'
import PlusIcon from '../../../../icons/PlusIcon'
import { deleteAction } from '../../../../redux/features/actionSlice'

const SettingsItem = ({
  writeId,
  writeName,
  writeStatus,
  priority,
  isLinked,
  actionId,
  handleChange,
}) => {
  const switchContainerClasses = cn(styles.switchContainer, {
    [styles.lock]: !isLinked,
  })

  const item = {
    writeId,
    writeName,
    writeStatus,
    isLinked,
    actionId,
    priority,
  }

  const handleToggleStatus = () => {
    handleChange({
      ...item,
      writeStatus: !writeStatus,
    })
  }

  const handleToggleLink = () => {
    handleChange({
      ...item,
      writeStatus: !isLinked ? false : null,
      isLinked: !isLinked,
    })
  }

  const handleChangePriority = (e) => {
    handleChange({
      ...item,
      priority: +e.currentTarget.value,
    })
  }
  return (
    <div className={styles.item}>
      <div className={styles.name}>{writeName}</div>
      <div className={switchContainerClasses}>
        <Switch onClick={handleToggleStatus} isActive={writeStatus} />
      </div>
      <div onClick={handleToggleLink} className={styles.linkContainer}>
        {isLinked ? (
          <LinkIcon color='#008641' />
        ) : (
          <UnlinkIcon color='#cc1414' />
        )}
      </div>
      <div className={styles.selectContainer}>
        <select defaultValue={priority} onChange={handleChangePriority}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      </div>
    </div>
  )
}

const SettingsAction = ({ onClose, action }) => {
  const dispatch = useDispatch()
  const [error, setError] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const { deviceAction, isLoading } = useSelector((state) => state.deviceAction)
  const [isDelateLoading, setIsDelateLoading] = React.useState(false)

  const devices = useSelector((state) => state.device.devices)
  const actions = useSelector((state) => state.action.actions)

  const [items, setItems] = React.useState([])
  const [actionName, setActionName] = React.useState('')

  React.useEffect(() => {
    if (isLoading) return

    setItems(
      devices.map((d) => {
        const currDeviceAction =
          deviceAction.find(
            (da) => da.deviceId === d.id && da.actionId === action.id
          ) || null

        let priority = 1
        let writeStatus = null
        let isLinked = false
        let actionId = null

        if (currDeviceAction) {
          writeStatus = currDeviceAction.deviceStatus
          isLinked = true
          priority = currDeviceAction.priority
          actionId = currDeviceAction.id
        }

        return {
          writeId: d.id,
          actionId,
          writeName: d.name,
          writeStatus,
          isLinked,
          priority,
        }
      })
    )
  }, [deviceAction, isLoading])

  React.useEffect(() => {
    dispatch(fetchDevicesActions())
    const currentAction = actions.find((a) => a.id === action.id)
    if (currentAction) {
      setActionName(currentAction.name)
    }
  }, [])

  const handleChange = (item) => {
    const updatedItems = items.map((i) => {
      if (i.writeId === item.writeId) {
        return item
      }
      return i
    })
    setItems(updatedItems)
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

  const handleSave = async () => {
    let dataForServer = items.map((i) => {
      const item = {}

      if (i.writeStatus === null) {
        // delete
        if (i.actionId) {
          item.id = i.actionId
          item.isDelete = true
        }
      } else {
        // create
        item.deviceId = i.writeId
        item.actionId = action.id
        item.priority = i.priority
        item.deviceStatus = i.writeStatus
        if (i.actionId) {
          // update
          item.id = i.actionId
        }
      }

      return item
    })

    dataForServer = dataForServer.filter((d) => Object.keys(d).length)

    const response = await dispatch(bulkUpdateDevicesActions(dataForServer))

    if (response && response.meta.rejectedWithValue) {
      handleSetError('Не вдалося зберегти налаштування')
      return
    }

    onClose()
  }

  const handleDelete = async () => {
    setIsDelateLoading(true)
    const response = await dispatch(deleteAction(action.id))
  
    if (response && response.error) {
      handleSetError('Не вдалося видалити надзвичайну ситуацію')
      setIsDelateLoading(false)
      return
    }
    setIsDelateLoading(false)
    onClose()
  }

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.title}>
          {actionName}
          <div onClick={handleDelete} className={styles.removeBtn}>
            <PlusIcon color='#cc1414' />
          </div>
        </div>
        <div className={styles.items}>
          {items.map((i, index) => (
            <SettingsItem key={index} {...i} handleChange={handleChange} />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <SuccessButton onClick={handleSave}>Зберегти</SuccessButton>
        </div>

        {isLoading || isDelateLoading && <Loading />}
      </div>
      {error && <Notification type='error' title='Помилка' text={error} />}
    </ModalWindow>
  )
}

export default SettingsAction

import React from 'react'
import styles from './readAgentItem.module.scss'
import ItemWrapper from '../../itemWrapper/ItemWrapper'
import Switch from '../../switch/Switch'
import { useDispatch } from 'react-redux'
import { changeDeviceStatus } from '../../../redux/features/deviceSlice'
import Tag from '../../tag/Tag'

const ReadAgentItem = ({ name, id, status, actionId }) => {
  const dispatch = useDispatch()
  const [isLock, setIsLock] = React.useState(false)

  const handleToggleStatus = async () => {
    setIsLock(true)
    await dispatch(changeDeviceStatus(id))
    setIsLock(false)
  }

  const handleSettingsClick = () => {
    setIsSettings(true)
  }

  let tagText = 'text'
  let tagType = ''

  switch (status) {
    case true:
      tagType = 'error'
      tagText = "Тривога"
      break
    case false:
      tagType = 'success'
      tagText = "Добре"
      break
    default:
      tagType = 'default'
      tagText = 'Не відомо'
  }

  return (
    <ItemWrapper
      name={name}
      isOnline={status !== null}
      onSettingsClick={handleSettingsClick}
    >
      <div className={styles.tag}>
        <Tag text={tagText} type={tagType} />
      </div>
    </ItemWrapper>
  )
}

export default ReadAgentItem

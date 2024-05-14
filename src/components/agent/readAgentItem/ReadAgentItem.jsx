import React from 'react'
import styles from './readAgentItem.module.scss'
import ItemWrapper from '../../itemWrapper/ItemWrapper'
import { useDispatch } from 'react-redux'
import Tag from '../../tag/Tag'

const ReadAgentItem = ({ name, id, status, actionId }) => {
  const [isLock, setIsLock] = React.useState(false)
  const [isOpenSettings, setIsOpenSettings] = React.useState(false)

  const handleClickSettings = () => {
    setIsOpenSettings(true)
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
    <ItemWrapper
      name={name}
      isOnline={status !== null}
      isDanger={status === true}
      onSettingsClick={handleClickSettings}
    >
      <div className={styles.tag}>
        <Tag text={tagText} type={tagType} />
      </div>
    </ItemWrapper>
  )
}

export default ReadAgentItem

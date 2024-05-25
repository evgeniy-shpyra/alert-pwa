import React from 'react'
import styles from './readAgentItem.module.scss'
import ItemWrapper from '../../itemWrapper/ItemWrapper'
import Tag from '../../tag/Tag'
import ModalWindow from '../../modalWindow/ModalWindow'
import ReadAgentSettings from '../RASettings/ReadAgentSettings'

const ReadAgentItem = ({ name, id, status, actionId }) => {
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
      isProxy={id < 0}
    >
      <div className={styles.tag}>
        <Tag text={tagText} type={tagType} />
      </div>
      {isOpenSettings && (
        <ReadAgentSettings
          onClose={() => {
            setIsOpenSettings(false)
          }}
          actionId={actionId}
          name={name}
          status={status}
          id={id}
        />
      )}
    </ItemWrapper>
  )
}

export default ReadAgentItem

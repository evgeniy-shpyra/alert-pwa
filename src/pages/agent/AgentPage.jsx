import { useSelector } from 'react-redux'
import styles from './agentPage.module.scss'
import ItemWrapper from '../../components/itemWrapper/ItemWrapper'
import Items from '../../components/items/Items'
import SectionsTitle from '../../components/sectionTitle/SectionsTitle'
import WriteAgentItem from '../../components/agent/WAItem/WriteAgentItem'
import PlusIcon from '../../icons/PlusIcon'
import React from 'react'
import ModalWindow from '../../components/modalWindow/ModalWindow'
import AddingDevice from '../../components/agent/addingAgent/AddingAgent'
import ReadAgentItem from '../../components/agent/RAItem/ReadAgentItem'

const AgentPage = () => {
  const devices = useSelector((state) => state.device.devices)
  const sensors = useSelector((state) => state.sensor.sensors)

  const [isAddingDevice, setIsAddingDevice] = React.useState(false)
  const [isAddingSensor, setIsAddingSensor] = React.useState(false)

  const handleCloseWD = () => {
    setIsAddingDevice(false)
  }
  const handleCloseRD = () => {
    setIsAddingSensor(false)
  }

  return (
    <div className={styles.wrapper}>
      <SectionsTitle>Пристрої виконання</SectionsTitle>
      <Items>
        {devices.map((d) => (
          <WriteAgentItem
            key={d.id}
            id={d.id}
            name={d.name}
            status={d.status}
          />
        ))}
        <ItemWrapper onClick={() => setIsAddingDevice(true)} isEmpty={true}>
          <PlusIcon />
        </ItemWrapper>
      </Items>
      <SectionsTitle>Сенсори</SectionsTitle>
      <Items>
        {sensors.map((s) => (
          <ReadAgentItem
            key={s.id}
            id={s.id}
            name={s.name}
            status={s.status}
            actionId={s.actionId}
          ></ReadAgentItem>
        ))}
        <ItemWrapper onClick={() => setIsAddingSensor(true)} isEmpty={true}>
          <PlusIcon />
        </ItemWrapper>
      </Items>

      {isAddingDevice && (
        <AddingDevice onClose={handleCloseWD} deviceType='write' />
      )}
      {isAddingSensor && (
        <AddingDevice onClose={handleCloseRD} deviceType='read' />
      )}
    </div>
  )
}

export default AgentPage

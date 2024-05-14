import { useSelector } from 'react-redux'
import styles from './devicePage.module.scss'
import ItemWrapper from '../../components/itemWrapper/ItemWrapper'
import Items from '../../components/items/Items'
import SectionsTitle from '../../components/sectionTitle/SectionsTitle'
import DeviceItem from '../../components/device/deviceItem/DeviceItem'
import PlusIcon from '../../icons/PlusIcon'
import React from 'react'
import ModalWindow from '../../components/modalWindow/ModalWindow'
import AddingDevice from '../../components/device/addingDevice/AddingDevice'

const DevicePage = () => {
  const devices = useSelector((state) => state.device.devices)
  const sensors = useSelector((state) => state.sensor.sensors)

  const [isAddingDevice, setIsAddingDevice] = React.useState(false)
  const [isAddingSensor, setIsAddingSensor] = React.useState(false)

  return (
    <div className={styles.wrapper}>
      <SectionsTitle>Пристрої виконання</SectionsTitle>
      <Items>
        {devices.map((d) => (
          <DeviceItem key={d.id} id={d.id} name={d.name} status={d.status} />
        ))}
        <ItemWrapper onClick={() => setIsAddingDevice(true)} isEmpty={true}>
          <PlusIcon />
        </ItemWrapper>
      </Items>
      <SectionsTitle>Сенсори</SectionsTitle>
      <Items>
        {sensors.map((s) => (
          <ItemWrapper key={s.id} id={s.id} name={s.name}></ItemWrapper>
        ))}
        <ItemWrapper onClick={() => setIsAddingDevice(true)} isEmpty={true}>
          <PlusIcon />
        </ItemWrapper>
      </Items>

      {isAddingDevice && (
        <ModalWindow onClose={() => setIsAddingDevice(false)}>
          <AddingDevice onClose={() => setIsAddingDevice(false)} />
        </ModalWindow>
      )}
    </div>
  )
}

export default DevicePage

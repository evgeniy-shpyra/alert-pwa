import { useSelector } from 'react-redux'
import styles from './devicePage.module.scss'
import ItemWrapper from '../../components/itemWrapper/ItemWrapper'
import Items from '../../components/items/Items'
import SectionsTitle from '../../components/sectionTitle/SectionsTitle'
import DeviceItem from '../../components/device/deviceItem/DeviceItem'

const DevicePage = () => {
  const devices = useSelector((state) => state.device.devices)
  const sensors = useSelector((state) => state.sensor.sensors)

  return (
    <div className={styles.wrapper}>
      <SectionsTitle>Пристрої виконання</SectionsTitle>
      <Items>
        {devices.map((d) => (
          <DeviceItem key={d.id} id={d.id} name={d.name} status={d.status} />
        ))}
      </Items>
      <SectionsTitle>Сенсори</SectionsTitle>
      <Items>
        {sensors.map((s) => (
          <ItemWrapper key={s.id} id={s.id} name={s.name}></ItemWrapper>
        ))}
      </Items>
      
    </div>
  )
}

export default DevicePage

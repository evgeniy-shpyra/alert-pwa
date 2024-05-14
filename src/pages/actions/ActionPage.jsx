import React from 'react'
import styles from './actionPage.module.scss'
import { useSelector } from 'react-redux'
import ActionItem, {
  AddActionBtn,
} from '../../components/actions/item/ActionItem'
import Items from '../../components/items/Items'
import AddingAction from '../../components/actions/addingAction/AddingAction'

const ActionPage = () => {
  const actions = useSelector((state) => state.action.actions)
  const sensors = useSelector((state) => state.sensor.sensors)

  const [isAddingAction, setIsAddingAction] = React.useState(false)

  return (
    <div className={styles.wrapper}>
      <Items>
        {actions.map((a) => (
          <ActionItem
            key={a.id}
            {...a}
            isActive={
              sensors.find((s) => s.actionId === a.id && s.status === true)
                ? true
                : false
            }
          />
        ))}
        <AddActionBtn onClick={() => setIsAddingAction(true)} />
      </Items>
      {isAddingAction && (
        <AddingAction onClose={() => setIsAddingAction(false)} />
      )}
    </div>
  )
}

export default ActionPage

import React from 'react'
import { useSelector } from 'react-redux'
import UserItem, { AddUserBtn } from '../../components/users/item/UserItem'
import styles from './usersPage.module.scss'
import Items from '../../components/items/Items'
import AddingUser from '../../components/users/addingUser/AddingUser'
import SectionsTitle from '../../components/sectionTitle/SectionsTitle'

const UsersPage = () => {
  const [isAddingUser, setIsAddingUser] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [anotherUsers, setAnotherUsers] = React.useState([])

  const { users, login } = useSelector((state) => state.user)

  React.useEffect(() => {
    if (!users.length) return
    const currentUser = users.find((u) => u.login === login)
    setCurrentUser(currentUser)
    setAnotherUsers(users.filter((u) => u.login !== login))
  }, [users, login])

  return (
    <div className={styles.wrapper}>
      {currentUser && (
        <>
          <SectionsTitle>Поточний користувач</SectionsTitle>
          <UserItem key={currentUser.id} {...currentUser} />
          <SectionsTitle>Інші користувачі</SectionsTitle>
        </>
      )}
      <Items>
        {anotherUsers.map((a) => (
          <UserItem key={a.id} {...a} />
        ))}

        <AddUserBtn onClick={() => setIsAddingUser(true)} />
      </Items>
      {isAddingUser && <AddingUser onClose={() => setIsAddingUser(false)} />}
    </div>
  )
}

export default UsersPage

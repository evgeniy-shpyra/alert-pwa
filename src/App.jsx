import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, fetchUsers } from './redux/features/userSlice'
import Loading from './components/loading/Loading'
import { fetchDevices, setDeviceStatus } from './redux/features/deviceSlice'
import ws from './api/hub/ws.js'
import { fetchActions } from './redux/features/actionSlice'
import Menu from './components/menu/Menu.jsx'
import { fetchSensors, setSensorStatus } from './redux/features/sensorSlice.js'
import { pingSystem } from './redux/features/systemSlice.js'

const wsHandler = (dispatch, token) => {
  const onOpen = () => {
    dispatch(pingSystem())
  }
  const onMessage = (message) => {
    const data = JSON.parse(message)
    const payload = data.payload

    switch (data.action) {
      case 'deviceStatus':
        dispatch(setDeviceStatus({ id: payload.id, status: payload.status }))
        break
      case 'sensorStatus':
        dispatch(setSensorStatus({ id: payload.id, status: payload.status }))
        break
    }
  }
  const onError = () => {
    console.log('error')
  }

  ws({ onOpen, onMessage, onError }, token)
}

const App = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(true)

  const dispatch = useDispatch()
  const { isAuthorized, token } = useSelector((state) => state.user)
  const fetchData = async () => {
    setIsLoading(true)
    const promises = [
      dispatch(fetchUsers()),
      dispatch(fetchDevices()),
      dispatch(fetchSensors()),
      dispatch(fetchActions()),
    ]
    await Promise.all(promises)
    setIsLoading(false)
  }

  React.useEffect(() => {
    dispatch(fetchUser())
  }, [])

  React.useEffect(() => {
    if (isAuthorized !== true) return
    wsHandler(dispatch, token)
    fetchData()
  }, [isAuthorized, token])

  React.useEffect(() => {
    if (isAuthorized === false) navigate('/login')
  }, [isAuthorized])

  return (
    <>
      <Routes>
        <Route path='/' element={<Menu />} />
      </Routes>
      {isLoading && <Loading />}
    </>
  )
}

export default App

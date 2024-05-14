import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from './redux/features/userSlice'
import Loading from './components/loading/Loading'
import { fetchDevices, setDeviceStatus } from './redux/features/deviceSlice'
import ws from './api/hub/ws.js'
import { fetchActions } from './redux/features/actionSlice'
import Menu from './components/menu/Menu.jsx'
import { fetchSensors } from './redux/features/sensorSlice.js'

const wsHandler = (dispatch) => {
  const onOpen = () => {
    console.log('WS: ok')
  }
  const onMessage = (message) => {
    console.log(message)
    const data = JSON.parse(message)
    const payload = data.payload

    switch (data.action) {
      case 'deviceStatus':
        dispatch(setDeviceStatus({ id: payload.id, status: payload.status }))
        break
      //   case 'threat':
      //     dispatch(
      //       changeMissileStatus({ id: payload.id, status: payload.status })
      //     )
      //     break
      //   case 'deviceOnline':
      //     dispatch(
      //       toggleDeviceOnline({ id: payload.id, isOnline: payload.isOnline })
      //     )
      //     break
    }
  }
  const onError = () => {}

  ws({ onOpen, onMessage, onError })
}

const App = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { isLoading: isLoadingUser, isAuthorized } = useSelector(
    (state) => state.user
  )
  const isLoadingDevice = useSelector((state) => state.device.isLoading)
  const isLoadingSensor = useSelector((state) => state.sensor.isLoading)
  const isLoadingAction = useSelector((state) => state.action.isLoading)

  React.useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchDevices())
    dispatch(fetchSensors())
    dispatch(fetchActions())
  }, [])

  React.useEffect(() => {
    if (isAuthorized !== true) return
    wsHandler(dispatch)
  }, [isAuthorized])

  React.useEffect(() => {
    if (isAuthorized === false) navigate('/login')
  }, [isAuthorized])

  if (isLoadingUser || isLoadingDevice || isLoadingAction || isLoadingSensor) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path='/' element={<Menu />} />
    </Routes>
  )
}

export default App

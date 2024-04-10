import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DevicePage from './pages/device/DevicePage'
import MainPage from './pages/main/MainPage'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from './redux/features/userSlice'
import Loading from './components/loading/Loading'
import { fetchDevices, toggleDeviceOnline } from './redux/features/deviceSlice'
import ws from './api/ws'
import { changeMissileStatus, fetchActions } from './redux/features/actionSlice'

const wsHandler = (dispatch) => {
  const onOpen = () => {
    console.log('WS: ok')
  }
  const onMessage = (message) => {
    const data = JSON.parse(message)
    const payload = data.payload

    switch (data.action) {
      case 'threat':
        dispatch(
          changeMissileStatus({ id: payload.id, status: payload.status })
        )
        break
      case 'deviceOnline':
        dispatch(
          toggleDeviceOnline({ id: payload.id, isOnline: payload.isOnline })
        )
        break
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
  const isLoadingAction = useSelector((state) => state.action.isLoading)

  React.useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchDevices())
    dispatch(fetchActions())
  }, [])

  React.useEffect(() => {
    if (isAuthorized !== true) return
    wsHandler(dispatch)
  }, [isAuthorized])

  React.useEffect(() => {
    if (isAuthorized === false) navigate('/login')
  }, [isAuthorized])

  if (isLoadingUser || isLoadingDevice || isLoadingAction) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/device' element={<DevicePage />} />
    </Routes>
  )
}

export default App

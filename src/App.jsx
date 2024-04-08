import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DevicePage from './pages/device/DevicePage'
import MainPage from './pages/main/MainPage'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from './redux/features/userSlice'
import Loading from './components/loading/Loading'
import { fetchDevices } from './redux/features/deviceSlice'

const App = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { isLoading: isLoadingUser, isAuthorized } = useSelector((state) => state.user)
  const isLoadingDevice = useSelector((state) => state.device.isLoading)

  React.useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchDevices())

  }, [])

  React.useEffect(() => {
    if (isAuthorized === false) navigate('/login')
  }, [isAuthorized])

  if (isLoadingUser || isLoadingDevice) {
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

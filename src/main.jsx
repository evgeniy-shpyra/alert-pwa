import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'normalize.css'
import './index.css'
import MainPage from './pages/main/MainPage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

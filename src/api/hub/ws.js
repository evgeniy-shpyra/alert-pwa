import { urlWs } from '.'

const ws = (handlers = {}) => {
  const onMessage = handlers.onMessage || null
  const onOpen = handlers.onOpen || null
  const onError = handlers.onError || null

  const socket = new WebSocket(`${urlWs}/ws/user`)

  socket.addEventListener('error', (event) => {
    console.log('Ws Error ', event)
    onError && onError(event)
  })

  socket.addEventListener('open', (event) => {
    onOpen && onOpen()
  })

  socket.addEventListener('message', (event) => {
    onMessage && onMessage(event.data)
  })
}

export default ws

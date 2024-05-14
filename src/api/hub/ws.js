import { urlWs } from '.'

const ws = (handlers = {}) => {
  const onMessage = handlers.onMessage || null
  const onOpen = handlers.onOpen || null
  const onClose = handlers.onClose || null
  const onError = handlers.onError || null

  const socket = new WebSocket(`${urlWs}/ws/user`)

  socket.addEventListener('error', (event) => {
    console.log('Ws: Error ', event)
    onError && onError(event)
  })
  socket.addEventListener('open', (event) => {
    console.log("WS: open")
    onOpen && onOpen()
  })
  socket.addEventListener('close', (event) => {
    console.log("WS: close")
    onClose && onClose()
  })

  socket.addEventListener('message', (event) => {
    onMessage && onMessage(event.data)
  })
}

export default ws

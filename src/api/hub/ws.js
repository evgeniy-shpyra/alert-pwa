import { urlWs } from '.'

const ws = (handlers = {}, token) => {
  const onMessage = handlers.onMessage || null
  const onOpen = handlers.onOpen || null
  const onClose = handlers.onClose || null
  const onError = handlers.onError || null

  let queryToken = crypto.randomUUID()
  if (token && token.length) {
    queryToken = token
  }

  const socket = new WebSocket(`${urlWs}/ws/user/${queryToken}`)

  socket.addEventListener('error', (event) => {
    console.log('Ws: Error ', event)
    onError && onError(event)
  })
  socket.addEventListener('open', (event) => {
    console.log('WS: open')
    onOpen && onOpen()
  })
  socket.addEventListener('close', (event) => {
    console.log('WS: close')
    onClose && onClose()
  })

  socket.addEventListener('message', (event) => {
    onMessage && onMessage(event.data)
  })
}

export default ws

import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/hello', (request, response) => {
  response.status(200).send('Hello World')
})

// Handle WebRTC signaling
io.on('connection', (socket) => {
  console.log('New user connected')

  // Generate a room ID for new connections
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
    console.log(io.sockets._ids)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })

  // Handle signaling data exchange
  socket.on('signal', (roomId, signalData) => {
    socket.to(roomId).emit('signal', signalData)
  })
})

//Init
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

import express from 'express'
import cors from 'cors'
import { Socket } from 'socket.io'
import { todoRouter } from './routes'
import { app, io, server } from './server'

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:4000' }))
app.use('/todo', todoRouter)

io.on('connection', (socket: Socket) => {
  console.log('A new client connected')
  socket.on('todoAdded', (newTodo) => io.emit('todoAdded', newTodo))
  socket.on('todosUpdated', (updatedTodos) => io.emit('todosUpdated', updatedTodos))
  socket.on('todosDeleted', (deletedTodos) => io.emit('todosDeleted', deletedTodos))
  socket.on('disconnect', () => console.log('A client disconnected'))
})

server.listen(PORT, () => {
  console.log(`⚡️Server is running on port ${PORT}`)
})

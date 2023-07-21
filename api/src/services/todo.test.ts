import { expect } from 'chai'
import { PrismaClient } from '@prisma/client'
import { TodoInput } from '../types'
import { createTodo, updateTodos, deleteTodos, deleteAllTodos } from './todo'

const prisma = new PrismaClient()

describe('Prisma Functions Tests', () => {
  before(async () => {
    // Connect to an in-memory SQLite database for testing
    await prisma.$connect()
  })

  after(async () => {
    // Disconnect the Prisma client after all tests are completed
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.todo.deleteMany()
  })

  it('should create a new todo', async () => {
    const todoInput: TodoInput = { content: 'Buy groceries' }
    const createdTodo = await createTodo(todoInput)

    expect(createdTodo).to.have.property('id')
    expect(createdTodo.content).to.equal(todoInput.content)
    expect(createdTodo.done).to.be.false
  })

  it('should update todos', async () => {
    // Create some sample todos in the database
    const todo1 = await prisma.todo.create({ data: { content: 'Todo 1', done: false } })
    const todo2 = await prisma.todo.create({ data: { content: 'Todo 2', done: false } })

    // Update the todos
    const todoUpdates: TodoInput[] = [
      { id: todo1.id, done: true },
      { id: todo2.id, done: true },
    ]
    await updateTodos(todoUpdates)

    // Fetch the updated todos from the database
    const updatedTodo1 = await prisma.todo.findUnique({ where: { id: todo1.id } })
    const updatedTodo2 = await prisma.todo.findUnique({ where: { id: todo2.id } })

    expect(updatedTodo1?.done).to.be.true
    expect(updatedTodo2?.done).to.be.true
  })

  it('should delete todos', async () => {
    // Create some sample todos in the database
    const todo1 = await prisma.todo.create({ data: { content: 'Todo 1', done: false } })
    const todo2 = await prisma.todo.create({ data: { content: 'Todo 2', done: false } })

    // Delete the todos
    const todoIdsToDelete = [todo1.id, todo2.id]
    await deleteTodos(todoIdsToDelete)

    // Check if the todos are deleted from the database
    const deletedTodo1 = await prisma.todo.findUnique({ where: { id: todo1.id } })
    const deletedTodo2 = await prisma.todo.findUnique({ where: { id: todo2.id } })

    expect(deletedTodo1).to.be.null
    expect(deletedTodo2).to.be.null
  })

  it('should delete all todos', async () => {
    // Create some sample todos in the database
    await prisma.todo.create({ data: { content: 'Todo 1', done: false } })
    await prisma.todo.create({ data: { content: 'Todo 2', done: false } })

    // Delete all todos
    await deleteAllTodos()

    // Check if all todos are deleted from the database
    const todos = await prisma.todo.findMany()
    expect(todos).to.be.empty
  })
})

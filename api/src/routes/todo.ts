import express, { Request, Response } from 'express'
import { createTodo, deleteTodos, fetchTodos, updateTodos } from '../services'
import { validateCreateInput, validateDeleteInput, validateUpdateInput } from '../utils'
import { TodoInput } from '../types'
import { deleteAllTodos, getLastTodoId } from '../services/todo'
import { io } from '../server'

const todoRouter = express.Router()

// CREATE TODO
todoRouter.post('/', async (req: Request, res: Response) => {
  try {
    const input: TodoInput = req.body
    const { error } = validateCreateInput(input)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    const todo = await createTodo(input)

    io.emit('todoAdded', todo)
    return res.json(todo)

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    return res.status(400).json({ error: errorMessage })
  }
})

// GET TODOs
todoRouter.get('/', async (req: Request, res: Response) => {
  const { done } = req.query
  const doneBool = !!Number(done)
  let lastId

  try {
    const todos = await fetchTodos(!!Number(doneBool))
    if (!doneBool) lastId = await getLastTodoId()

    return res.json({ todos, lastId })

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    return res.status(400).json({ error: errorMessage })
  }
})

// UPDATE TODOs (mark them as todo/done)
todoRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const input: TodoInput[] = req.body
    const { error } = validateUpdateInput(input)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    const todos = await updateTodos(input)
    io.emit('todosUpdated', todos)

    return res.json(todos)

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    return res.status(400).json({ error: errorMessage })
  }
})

// Delete TODOs
todoRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const input: number[] = req.body
    const { error } = validateDeleteInput(input)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    const response = await deleteTodos(input)
    if (!!response.count) io.emit('todosDeleted', input)

    return res.json(response)

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    return res.status(400).json({ error: errorMessage })
  }
})

// Delete All TODOs
todoRouter.delete('/all', async (_req: Request, res: Response) => {
  try {
    const todos = await deleteAllTodos()

    return res.json(todos)

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    return res.status(400).json({ error: errorMessage })
  }
})

export default todoRouter

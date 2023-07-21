import { NoContentTodo } from '../types'

const API_URL = 'http://localhost:4001'

const fetchTodosUtil = async (done: 0 | 1 = 0) => {
  const response = await fetch(`${API_URL}/todo?done=${done}`)
  const jsonResponse = await response.json()

  if (!response.ok) {
    throw new Error(jsonResponse.error)
  }

  return jsonResponse
}

export const getTodos = async () => {
  try {
    const { todos, lastId } = await fetchTodosUtil()
    const { todos: doneTodos } = await fetchTodosUtil(1)

    return { todos, lastId, doneTodos }

  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export const createTodo = async (content: string) => {
  try {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw new Error(jsonResponse.error)
    }

    return jsonResponse

  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export const updateTodos = async (data: NoContentTodo[]) => {
  try {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw new Error(jsonResponse.error)
    }

    return jsonResponse

  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export const deleteAllTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todo/all`, { method: 'DELETE' })

    return response

  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

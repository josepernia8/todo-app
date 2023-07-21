import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react'
import socketIOClient from 'socket.io-client'
import { Action, ActionType, NoContentTodo, State } from '../types'
import { getTodos, updateTodos } from '../services'
import { initialState, reducer } from '../reducers/todoReducer'
import debounce from 'lodash.debounce'

const ENDPOINT = 'http://localhost:4001'

const TodoContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
})

const debounceUpdate = debounce(async (data: NoContentTodo[]) => {
  try {
    await updateTodos(data)
  } catch (error: unknown) {
    console.error((error as Error).message )
  }
}, 2500)

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //** Fetch Initial Data
  useEffect(() => {
    async function fetchData() {
      try {
        const { todos, lastId, doneTodos } = await getTodos()

        dispatch({ type: ActionType.INIT, todos: todos.concat(doneTodos), lastId })
      } catch(err) {
        const error = (err as Error).message

        console.error('Error fetching initial state:', error)
        throw new Error(error)
      }
    }

    fetchData()
  }, [])

  //** Make PATCH request to update all the marked/un-marked todos on a single call
  useEffect(() => {
    if (!state.changedTodos.length) return
    debounceUpdate(state.changedTodos)

  }, [state.changedTodos])

  //** Listen to data changes on the server
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

    socket.on('todoAdded', ({ content }) => dispatch({ type: ActionType.ADD, content }))
    socket.on('todosUpdated', (todos) => dispatch({ type: ActionType.SYNC, todos }))
    socket.on('todosDeleted', (todoIds) => dispatch({ type: ActionType.DELETE, todoIds }))

    return () => {
      socket.disconnect()
    }
  }, [dispatch])

  return (
    <TodoContext.Provider value={{state, dispatch}}>
      {children}
    </TodoContext.Provider>
  )
}

export default function useTodo() {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodo must be used within a TodoProvider')

  return context
}

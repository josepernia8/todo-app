import { Action, ActionType, NoContentTodo, State } from '../types'

const initialState: State = { todos: [], changedTodos: [], lastId: 0 }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT:
      return { todos: action.todos, changedTodos: [], lastId: action.lastId }
    case ActionType.ADD:
      const newTodos = state.todos.concat([{ id: state.lastId++, content: action.content, done: false }])
      newTodos.sort((a, b) => a.content < b.content ? -1 : 1)

      return {
        ...state,
        todos: newTodos,
      }
    case ActionType.MARK:
      const { todos, changedTodos } = state
      const changed: NoContentTodo[]  = []

      const markedTodos = todos.map((todo) => {
        if (todo.id === action.id) {
          const changedIndex = changedTodos.findIndex((ct) => ct.id === todo.id)
          if (changedIndex !== -1) {
            changedTodos[changedIndex].done = !todo.done
          } else {
            changed.push({ id: todo.id, done: !todo.done})
          }
          return { ...todo, done: !todo.done }
        }
        return todo
      })

      return {
        ...state,
        todos: markedTodos,
        changedTodos: [...changedTodos, ...changed]
      }
    case ActionType.SYNC:
      const updatedTodos = action.todos

      const syncedTodos = state.todos.map((todo) => {
        const foundIndex = updatedTodos.findIndex((t) => t.id === todo.id)
        if (foundIndex !== -1) {
          return {
            ...todo,
            done: updatedTodos[foundIndex].done
          }
        }

        return todo
      })

      return {
        ...state,
        todos: syncedTodos
      }
    case ActionType.DELETE:
      const delTodos = state.todos.filter(({ id }) => action.todoIds.find((tid) => tid !== id))

      return {
        ...state,
        todos: delTodos
      }
    case ActionType.RESET:
      return initialState
    default:
      return state
  }
}

export { initialState, reducer }

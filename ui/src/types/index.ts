export interface Todo {
  id: number
  content: string
  done: boolean
}

export type NoContentTodo = Omit<Todo, 'content'>

export interface State {
  todos: Todo[]
  changedTodos: NoContentTodo[]
  lastId: number
}

export enum ActionType {
  ADD,
  INIT,
  MARK,
  SYNC,
  DELETE,
  RESET
}

export type Action =
  | { type: ActionType.ADD, content: string }
  | { type: ActionType.INIT, lastId: number, todos: Todo[] }
  | { type: ActionType.MARK, id: number }
  | { type: ActionType.SYNC, todos: NoContentTodo[] }
  | { type: ActionType.DELETE, todoIds: number[] }
  | { type: ActionType.RESET }

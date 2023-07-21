import React from 'react'
import useTodo from '../hooks/useTodo'
import { ActionType } from '../types'

interface TodoProps {
  id: number
  content: string
  done: boolean
}

const Todo: React.FC<TodoProps> = ({ content, done, id }) => {
  const { dispatch } = useTodo()

  const handleChange = () => {
    dispatch({ type: ActionType.MARK, id })
  }

  return (
    <div className="flex items-start space-x-2 mb-2">
      <input
        type="checkbox"
        checked={done}
        onChange={handleChange}
        className="cursor-pointer"
      />
      <p className={`w-fit ${done ? 'line-through text-gray-500' : 'text-black'}`}>{content}</p>
    </div>
  )
}

export default Todo

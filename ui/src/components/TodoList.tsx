import React, { useState } from 'react'
import Todo from './Todo'
import { Todo as TodoType } from '../types'

interface TodoListProps {
  todos: TodoType[]
  title: string
}

const TodoList: React.FC<TodoListProps> = ({ todos, title }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
        {todos.map(({ id, content, done }) => (
          <Todo
            key={id}
            id={id}
            content={content}
            done={done}
          />
        ))}
    </div>
  )
}

export default TodoList

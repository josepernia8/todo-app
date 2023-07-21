import React, { FormEvent, useState } from 'react'
import useTodo from "../hooks/useTodo"
import { createTodo } from '../services'

const AddTodo: React.FC = () => {
  const [content, setContent] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (content.trim() !== '') {
      createTodo(content)
      setContent('')
    }
  }

  return (
    <form className="flex space-x-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        placeholder="Enter your new todo..."
      />
      <button type="submit" className="px-4 py-2 bg-main-blue text-white rounded-lg hover:bg-blue-600">
        Add
      </button>
    </form>
  )
}

export default AddTodo

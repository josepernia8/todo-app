import React, { useState } from 'react'
import Modal from './components/Modal'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import SearchTodo from './components/SearchTodo'
import useTodo from './hooks/useTodo'
import { ActionType } from './types'
import { deleteAllTodos } from './services'

const App: React.FC = () => {
  const { state: { todos }, dispatch } = useTodo()
  const [showModal, setShowModal] = useState(false)
  const [searchText, setSearchText] = useState('')

  const filteredTodos = todos.filter((todo) =>
    todo.content.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleSubmitModal = async () => {
    await deleteAllTodos()
    dispatch({ type: ActionType.RESET })
    handleCloseModal()
  }

  return (
    <main className="max-w-xl mx-auto py-16 p-8">
      <div className="flex justify-end py-5 text-red-600">
        <button className="cursor-pointer underline" onClick={handleOpenModal}>Delete all tasks</button>
      </div>
      <div className="flex flex-col md:flex-row md:gap-6 md:items-baseline">
        <AddTodo />
        <SearchTodo onSearch={setSearchText} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-8">
        <TodoList key="todo" todos={filteredTodos.filter((todo) => !todo.done)} title="To Do" />
        <TodoList key="done" todos={filteredTodos.filter((todo) => todo.done)} title="Done" />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onApprove={handleSubmitModal}
        contentText="Are you sure you want to delete all todos?"
      />
    </main>
  )
}

export default App

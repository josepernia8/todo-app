import React from 'react'

interface SearchTodoProps {
  onSearch: (text: string) => void
}

const SearchTodo: React.FC<SearchTodoProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      placeholder="Search todos..."
    />
  )
}

export default SearchTodo

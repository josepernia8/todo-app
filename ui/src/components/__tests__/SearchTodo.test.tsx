import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchTodo from '../SearchTodo'

describe('SearchTodo', () => {
  it('should render correctly', () => {
    const onSearch = jest.fn() // Mock the onSearch function
    render(<SearchTodo onSearch={onSearch} />)
    const inputElement = screen.getByPlaceholderText('Search todos...')

    expect(inputElement).toBeInTheDocument()
  })

  it('should call onSearch when the input value changes', () => {
    const onSearch = jest.fn() // Mock the onSearch function
    render(<SearchTodo onSearch={onSearch} />)
    const inputElement = screen.getByPlaceholderText('Search todos...')

    const searchText = 'Buy groceries'
    fireEvent.change(inputElement, { target: { value: searchText } })

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith(searchText)
  })
})

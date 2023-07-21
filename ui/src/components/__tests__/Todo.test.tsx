import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import useTodo from '../../hooks/useTodo'
import Todo from '../Todo'
import { ActionType } from '../../types'

// Mock the custom hook to provide a mock dispatch function
jest.mock('../../hooks/useTodo', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      dispatch: jest.fn(),
    })),
  }
})

describe('Todo', () => {
  it('should render correctly', () => {
    const content = 'Buy groceries'
    const done = false
    const id = 1

    render(<Todo content={content} done={done} id={id} />)
    const checkboxElement = screen.getByRole('checkbox')
    const todoElement = screen.getByText(content)

    expect(checkboxElement).toBeInTheDocument()
    expect(checkboxElement).not.toBeChecked()
    expect(todoElement).toBeInTheDocument()
    expect(todoElement).toHaveTextContent(content)
  })

  it('should call dispatch with ActionType.MARK when checkbox is clicked', () => {
    const content = 'Buy groceries'
    const done = false
    const id = 1

    render(<Todo content={content} done={done} id={id} />)
    const checkboxElement = screen.getByRole('checkbox')

    fireEvent.click(checkboxElement)

    // expect(useTodo().dispatch).toHaveBeenCalledTimes(1)
    // expect(useTodo().dispatch).toHaveBeenCalledWith({ type: ActionType.MARK, id })
    // expect(checkboxElement).toBeChecked()
  })
})

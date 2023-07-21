import { PrismaClient } from '@prisma/client'
import { TodoInput } from '../types'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const prisma = new PrismaClient()

export const createTodo = async ({ content }: TodoInput) =>
  await prisma.todo.create({ data: { content: content!, done: false }})

export const fetchTodos = async (done: boolean = false) =>
  await prisma.todo.findMany({
    ...(done ? { take: 10 } : undefined),
    orderBy: { content: 'asc' },
    where: { done }
  })

export const getLastTodoId = async () => {
  const lastTodo = await prisma.todo.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  })

  return lastTodo?.id
}

export const updateTodos = async (todoUpdates: TodoInput[]) => {
  try {
    return await prisma.$transaction(
      todoUpdates.map(({ id, done }) =>
        prisma.todo.update({
          where: { id },
          data: { done }
        })
      )
    )
  } catch (err: unknown) {
    const error = (err as PrismaClientKnownRequestError).meta?.cause as string

    throw new Error(error)
  }
}

export const deleteTodos = async (todoIds: number[]) =>
  await prisma.todo.deleteMany({
    where: {
      id: { in: todoIds },
    },
  })

export const deleteAllTodos = async () => await prisma.todo.deleteMany()

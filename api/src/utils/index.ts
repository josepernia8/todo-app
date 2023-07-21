import Joi from 'joi'
import { TodoInput } from '../types'

const createSchema = Joi.object<TodoInput>({
  content: Joi
    .string()
    .required()
    .not()
    .empty()
    .messages({
      'any.required': 'Property content is required.',
      'string.empty': 'Property content cannot be an empty string.'
    })
})

const updateSchema = Joi.array().items(
  Joi.object<TodoInput>({
    id: Joi.number().required().messages({ 'any.required': 'Property id is required.' }),
    done: Joi.boolean().required().messages({ 'string.empty': 'Property done cannot be empty.' }),
  }))
  .required()
  .min(1)
  .messages({
    'array.base': 'An array of ids with their `done` values was expected.',
    'array.min': 'A minimum of one object is required.'
  })

const deleteSchema = Joi.array().items(
    Joi.number().integer().positive().strict().messages({ 'number.base': 'ids should only be numbers.' })
  )
  .required()
  .min(1)
  .messages({
    'array.base': 'An array of ids to delete was expected.',
    'array.min': 'A minimum of one id is required.'
  })


export const validateCreateInput = (input: TodoInput): Joi.ValidationResult<TodoInput> => createSchema.validate(input)
export const validateUpdateInput = (input: TodoInput[]): Joi.ValidationResult<TodoInput[]> => updateSchema.validate(input)
export const validateDeleteInput = (input: number[]): Joi.ValidationResult<number[]> => deleteSchema.validate(input)

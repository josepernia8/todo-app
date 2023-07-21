import { expect } from 'chai'
import { TodoInput } from '../types'
import { validateCreateInput, validateUpdateInput, validateDeleteInput } from './'

describe('Schema Validation Tests', () => {
  describe('validateCreateInput', () => {
    it('should validate a valid create input', () => {
      const validInput: TodoInput = { content: 'Buy groceries' }
      const result = validateCreateInput(validInput)
      expect(result.error).to.be.undefined
      expect(result.value).to.deep.equal(validInput)
    })

    it('should not validate an empty create input', () => {
      const invalidInput: TodoInput = { content: '' }
      const result = validateCreateInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('Property content cannot be an empty string.')
    })

    it('should not validate a create input without content', () => {
      const invalidInput: TodoInput = { content: undefined }
      const result = validateCreateInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('Property content is required.')
    })
  })

  describe('validateUpdateInput', () => {
    it('should validate a valid update input', () => {
      const validInput: TodoInput[] = [{ id: 1, done: true }]
      const result = validateUpdateInput(validInput)
      expect(result.error).to.be.undefined
      expect(result.value).to.deep.equal(validInput)
    })

    it('should not validate an empty update input', () => {
      const invalidInput: TodoInput[] = []
      const result = validateUpdateInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('A minimum of one object is required.')
    })

    it('should not validate an update input without id', () => {
      const invalidInput: TodoInput[] = [{ done: true }]
      const result = validateUpdateInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('Property id is required.')
    })
  })

  describe('validateDeleteInput', () => {
    it('should validate a valid delete input', () => {
      const validInput: number[] = [1, 2, 3]
      const result = validateDeleteInput(validInput)
      expect(result.error).to.be.undefined
      expect(result.value).to.deep.equal(validInput)
    })

    it('should not validate an empty delete input', () => {
      const invalidInput: number[] = []
      const result = validateDeleteInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('A minimum of one id is required.')
    })

    it('should not validate a delete input with non-numeric ids', () => {
      const invalidInput: any[] = [1, '2', 3]
      const result = validateDeleteInput(invalidInput)
      expect(result.error).to.not.be.undefined
      expect(result.error?.details[0].message).to.equal('ids should only be numbers.')
    })
  })
})

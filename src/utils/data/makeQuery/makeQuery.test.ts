import makeQuery from './makeQuery'
import { readFileSync } from 'fs'

const mockQuery = jest.fn().mockResolvedValue({ rows: [] })
const mockRelease = jest.fn()

jest.mock('pg', () => {
  return {
    Pool: jest.fn(() => ({
      connect: jest.fn().mockImplementation(() => ({
        query: mockQuery,
        release: mockRelease,
      })),
    })),
  }
})

jest.mock('fs')

// Mock the environment variables
jest.mock('dotenv', () => ({
  config: jest.fn(),
}))

// Mock environment variables
process.env.POSTGRES_USER = 'user'
process.env.POSTGRES_HOST = 'localhost'
process.env.POSTGRES_DB = 'database'
process.env.POSTGRES_PASSWORD = 'password'

// Mock console.log and console.error
global.console.log = jest.fn()
global.console.error = jest.fn()

describe('makeQuery', () => {
  it('should execute a query successfully', async () => {
    // Mock the readFileSync function
    ;(readFileSync as jest.Mock).mockReturnValue('SELECT * FROM users')

    // Execute the function
    await makeQuery('getUser', { messages: ['test', 'test'] })

    // Expectations
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM users', [])
    expect(mockRelease).toHaveBeenCalled()
    expect(global.console.log).toHaveBeenCalledWith('test successfully')
  })

  it('should handle an error and log an error message', async () => {
    // Mock the readFileSync function
    ;(readFileSync as jest.Mock).mockReturnValue('SELECT * FROM users')

    // Simulate an error in the query execution
    mockQuery.mockRejectedValueOnce(new Error('Query execution error'))

    // Execute the function
    await makeQuery('getUser', { messages: ['test', 'test'] })

    // Expectations
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM users', [])
    expect(mockRelease).toHaveBeenCalled()
    expect(global.console.error).toHaveBeenCalledWith(
      'Error test:',
      expect.any(Error)
    )
  })

  it('should execute a custom query successfully', async () => {
    // Execute the function with a custom query
    await makeQuery('getCustomData', {
      customQuery: 'SELECT * FROM custom_table',
      messages: ['tested', 'tested'],
    })

    // Expectations
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM custom_table', [])
    expect(mockRelease).toHaveBeenCalled()
    expect(global.console.log).toHaveBeenCalledWith('tested successfully')
  })
})

import bcrypt from 'bcrypt'
import makeQuery from '../../makeQuery'
import addUser from './addUser'

// Mock 'bcrypt' module
jest.mock('bcrypt')

// Mock 'makeQuery' module
jest.mock('../../makeQuery')

describe('addUser', () => {
  beforeEach(() => {
    // Reset the mock implementation of bcrypt.hash for each test
    ;(bcrypt.hash as jest.Mock).mockReset()
    // Reset the mock implementation of makeQuery for each test
    ;(makeQuery as jest.Mock).mockReset()
  })

  it('should add a new user successfully', async () => {
    // Mock bcrypt.hash to return a hashed password
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password')

    // Mock makeQuery to indicate that the user doesn't already exist and the user is successfully added
    ;(makeQuery as jest.Mock).mockResolvedValue({ rows: [] })

    // Execute the function
    const result = await addUser(
      'newUser',
      'password123',
      'newUser@example.com'
    )

    // Expectations
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(makeQuery).toHaveBeenCalledWith('checkUserExists', {
      args: { username: 'newUser', email: 'newUser@example.com' },
    })
    expect(makeQuery).toHaveBeenCalledWith('addUser', {
      messages: ['adding user', 'User created'],
      args: {
        username: 'newUser',
        email: 'newUser@example.com',
        password_hash: 'hashed_password',
      },
    })
    expect(result).toBe(true)
  })

  it('should return an error message if the user already exists', async () => {
    // Mock makeQuery to indicate that the user already exists
    ;(makeQuery as jest.Mock).mockResolvedValue({ rows: [{ id: 1 }] })

    // Execute the function
    const result = await addUser(
      'existingUser',
      'password123',
      'existingUser@example.com'
    )

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkUserExists', {
      args: { username: 'existingUser', email: 'existingUser@example.com' },
    })
    expect(result).toBe(
      'User may exist already - try logging in, or create a user with a different name and/or email.'
    )
  })

  it('should return false if makeQuery fails', async () => {
    // Mock makeQuery to throw an error
    ;(makeQuery as jest.Mock).mockResolvedValue(undefined)

    // Execute the function
    const result = await addUser(
      'newUser',
      'password123',
      'newUser@example.com'
    )

    // Expectations
    expect(result).toBe(false)
  })
})

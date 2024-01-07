import bcrypt from 'bcrypt'
import makeQuery from '../../makeQuery'
import checkUserCredentials from './checkUserCredentials'

jest.mock('bcrypt')
jest.mock('../../makeQuery')

describe('checkUserCredentials', () => {
  beforeEach(() => {
    // Reset the mock implementation of bcrypt.compare for each test
    ;(bcrypt.compare as jest.Mock).mockReset()
    // Reset the mock implementation of makeQuery for each test
    ;(makeQuery as jest.Mock).mockReset()
  })

  it('should return true for valid credentials', async () => {
    // Mock makeQuery to retrieve user credentials
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({
      rows: [{ password_hash: 'hashed_password' }],
    })
    // Mock bcrypt.compare to indicate a match
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

    // Execute the function
    const result = await checkUserCredentials('existingUser', 'password123')

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkUserCredentials', {
      args: { username: 'existingUser' },
    })
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      'hashed_password'
    )
    expect(result).toBe(true)
  })

  it('should return false for invalid credentials', async () => {
    // Mock makeQuery to retrieve user credentials
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({
      rows: [{ password_hash: 'hashed_password' }],
    })
    // Mock bcrypt.compare to indicate a mismatch
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await checkUserCredentials(
      'existingUser',
      'incorrect_password'
    )

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkUserCredentials', {
      args: { username: 'existingUser' },
    })
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'incorrect_password',
      'hashed_password'
    )
    expect(result).toBe(false)
  })

  it('should return false for a non-existing user', async () => {
    // Mock makeQuery to indicate that the user does not exist
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({ rows: [] })

    // Mock bcrypt.compare to indicate a mismatch
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await checkUserCredentials('nonExistingUser', 'password123')

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkUserCredentials', {
      args: { username: 'nonExistingUser' },
    })
    expect(bcrypt.compare).not.toHaveBeenCalled()
    expect(result).toBe(false)
  })

  it('should return false for an error during the database query', async () => {
    // Mock makeQuery to throw an error
    ;(makeQuery as jest.Mock).mockResolvedValueOnce(undefined)

    // Mock bcrypt.compare to indicate a mismatch
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await checkUserCredentials('existingUser', 'password123')

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkUserCredentials', {
      args: { username: 'existingUser' },
    })
    expect(bcrypt.compare).not.toHaveBeenCalled()
    expect(result).toBe(false)
  })
})

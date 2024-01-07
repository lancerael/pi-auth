import jwt from 'jsonwebtoken'
import { TOKEN_SECRETS } from '../../../constants'
import verifyToken from './verifyToken'

jest.mock('jsonwebtoken')

describe('verifyToken', () => {
  it('should return true if the token is valid', () => {
    // Mock jwt.verify to return a valid user object
    ;(jwt.verify as jest.Mock).mockReturnValue({ username: 'existingUser' })

    // Execute the function
    const result = verifyToken('validToken', 'access')

    // Expectations
    expect(jwt.verify).toHaveBeenCalledWith(
      'validToken',
      TOKEN_SECRETS['access']
    )
    expect(result).toBe('existingUser')
  })

  it('should return false if the token is invalid', () => {
    // Mock jwt.verify to throw an error (invalid token)
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    // Execute the function
    const result = verifyToken('invalidToken', 'access')

    // Expectations
    expect(result).toBe('')
  })

  it('should return false if an error occurs during token verification', () => {
    // Mock jwt.verify to throw an error (verification error)
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Verification error')
    })

    // Execute the function
    const result = verifyToken('validToken', 'access')

    // Expectations
    expect(result).toBe('')
  })

  it('should return empty string if the token is an empty string', () => {
    // Execute the function with an empty string as the token
    const result = verifyToken('', 'access')

    // Expectations
    expect(result).toBe('')
  })
})

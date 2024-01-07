import jwt from 'jsonwebtoken'
import { TOKEN_SECRETS } from '../../../constants'
import createToken from './createToken'

jest.mock('jsonwebtoken')

describe('createToken', () => {
  it('should create a token successfully', () => {
    // Mock jwt.sign to return a token
    ;(jwt.sign as jest.Mock).mockReturnValue('generated_token')

    // Execute the function
    const result = createToken('existingUser', 'access', '1h')

    // Expectations
    expect(jwt.sign).toHaveBeenCalledWith(
      { username: 'existingUser' },
      TOKEN_SECRETS['access'],
      {
        expiresIn: '1h',
      }
    )
    expect(result).toBe('generated_token')
  })

  it('should return false if an error occurs during token creation', () => {
    // Mock jwt.sign to throw an error
    ;(jwt.sign as jest.Mock).mockImplementation(() => {
      throw new Error('Token creation error')
    })

    // Execute the function
    const result = createToken('existingUser', 'access', '1h')

    // Expectations
    expect(result).toBe('')
  })
})

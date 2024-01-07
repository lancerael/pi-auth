import createToken from '../createToken/createToken'
import createTokens from './createTokens'

jest.mock('../createToken/createToken')

describe('createTokens', () => {
  it('should create both access and refresh tokens successfully', () => {
    // Mock createToken to return specific tokens
    ;(createToken as jest.Mock)
      .mockReturnValueOnce('generated_access_token')
      .mockReturnValueOnce('generated_refresh_token')

    // Execute the function
    const result = createTokens('existingUser')

    // Expectations
    expect(createToken).toHaveBeenNthCalledWith(
      1,
      'existingUser',
      'access',
      '15m'
    )
    expect(createToken).toHaveBeenNthCalledWith(
      2,
      'existingUser',
      'refresh',
      '7m'
    )
    expect(result).toEqual({
      access_token: 'generated_access_token',
      refresh_token: 'generated_refresh_token',
    })
  })
})

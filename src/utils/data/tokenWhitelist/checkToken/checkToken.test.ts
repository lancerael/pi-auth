import makeQuery from '../../makeQuery'
import checkToken from './checkToken'

jest.mock('../../makeQuery')

describe('checkToken', () => {
  it('should return true for a valid token', async () => {
    // Mock makeQuery to indicate that the token is found in the whitelist
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({
      rows: [{ token_type: 'access_token' }],
    })

    // Execute the function
    const result = await checkToken('valid_access_token', 'access')

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('checkToken', {
      messages: ['checking token', 'Token checked'],
      args: { access_token: 'valid_access_token' },
      cols: { token_type: 'access_token' },
    })
    expect(result).toBe(true)
  })

  it('should return false for an invalid token', async () => {
    // Mock makeQuery to indicate that the token is not found in the whitelist
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({ rows: [] })

    // Execute the function
    const result = await checkToken('invalid_access_token', 'access')

    // Expectations
    expect(result).toBe(false)
  })

  it('should return false if makeQuery throws an error', async () => {
    // Mock makeQuery to throw an error
    ;(makeQuery as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await checkToken('valid_access_token', 'access')

    // Expectations
    expect(result).toBe(false)
  })
})

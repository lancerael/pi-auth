import makeQuery from '../../makeQuery'
import tokenRefresh from './tokenRefresh'

jest.mock('../../makeQuery')

describe('tokenRefresh', () => {
  it('should return true if tokens are refreshed successfully', async () => {
    // Mock makeQuery to indicate that the tokens are refreshed successfully
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({})

    // Execute the function
    const result = await tokenRefresh('existingUser', {
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
    })

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('tokenRefresh', {
      messages: ['logging in', 'User logged in'],
      args: {
        username: 'existingUser',
        access_token: 'new_access_token',
        refresh_token: 'new_refresh_token',
      },
    })
    expect(result).toBe(true)
  })

  it('should return false if makeQuery throws an error', async () => {
    // Mock makeQuery to throw an error
    ;(makeQuery as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await tokenRefresh('existingUser', {
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
    })

    // Expectations
    expect(result).toBe(false)
  })
})

import makeQuery from '../../makeQuery'
import tokenRetire from './tokenRetire'

jest.mock('../../makeQuery')

describe('tokenRetire', () => {
  it('should return true if tokens are retired successfully', async () => {
    // Mock makeQuery to indicate that the tokens are retired successfully
    ;(makeQuery as jest.Mock).mockResolvedValueOnce({})

    // Execute the function
    const result = await tokenRetire('existingUser')

    // Expectations
    expect(makeQuery).toHaveBeenCalledWith('tokenRetire', {
      messages: ['logging out', 'User logged out'],
      args: { username: 'existingUser' },
    })
    expect(result).toBe(true)
  })

  it('should return false if makeQuery throws an error', async () => {
    // Mock makeQuery to throw an error
    ;(makeQuery as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await tokenRetire('existingUser')

    // Expectations
    expect(result).toBe(false)
  })
})

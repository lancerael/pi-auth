import validateToken from '../validateToken'
import validateUser from './validateUser'

jest.mock('../validateToken')

describe('validateUser', () => {
  it('should return 200 for a valid user', async () => {
    // Mock validateToken to resolve to 200
    ;(validateToken as jest.Mock).mockResolvedValueOnce(200)

    // Execute the function
    const result = await validateUser({
      headers: { authorization: 'Bearer validToken' },
    } as any)

    // Expectations
    expect(validateToken).toHaveBeenCalledWith('access', 'validToken')
    expect(result).toBe(200)
  })

  it('should return 401 for missing access token', async () => {
    // Mock validateToken to resolve to 401
    ;(validateToken as jest.Mock).mockResolvedValueOnce(401)

    // Execute the function with missing access token
    const result = await validateUser({
      headers: {},
    } as any)

    // Expectations
    expect(validateToken).toHaveBeenCalledWith('access', undefined)
    expect(result).toBe(401)
  })

  it('should return 403 for an invalid access token', async () => {
    // Mock validateToken to resolve to 403
    ;(validateToken as jest.Mock).mockResolvedValue(403)

    // Execute the function
    const result = await validateUser({
      headers: { authorization: 'Bearer invalidToken' },
    } as any)

    // Expectations
    expect(validateToken).toHaveBeenCalledWith('access', 'invalidToken')
    expect(result).toBe(403)
  })
})

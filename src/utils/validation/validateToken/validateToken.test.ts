import checkToken from '../../data/tokenWhitelist/checkToken'
import verifyToken from '../../jwt/verifyToken'
import validateToken from './validateToken'

jest.mock('../../jwt/verifyToken')
jest.mock('../../data/tokenWhitelist/checkToken')

describe('validateToken', () => {
  it('should return 200 for a valid and whitelisted token', async () => {
    // Mock verifyToken to return true and checkToken to resolve to true
    ;(verifyToken as jest.Mock).mockReturnValue('user')
    ;(checkToken as jest.Mock).mockResolvedValue(true)

    // Execute the function
    const result = await validateToken('access', 'validToken')

    // Expectations
    expect(result).toBe('user')
  })

  it('should return 403 for an invalid token', async () => {
    // Mock verifyToken to return false and checkToken to resolve to true
    ;(verifyToken as jest.Mock).mockReturnValue(false)
    ;(checkToken as jest.Mock).mockResolvedValue(true)

    // Execute the function
    const result = await validateToken('access', 'invalidToken')

    // Expectations
    expect(result).toBe(403)
  })

  it('should return 403 for a token not whitelisted', async () => {
    // Mock verifyToken to return true and checkToken to resolve to false
    ;(verifyToken as jest.Mock).mockReturnValue(true)
    ;(checkToken as jest.Mock).mockResolvedValue(false)

    // Execute the function
    const result = await validateToken('access', 'unwhitelistedToken')

    // Expectations
    expect(result).toBe(403)
  })

  it('should return 401 for missing token', async () => {
    // Execute the function with missing token
    const result = await validateToken('access', undefined)

    // Expectations
    expect(result).toBe(401)
  })
})

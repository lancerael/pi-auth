import refreshLogin from './refreshLogin'
import tokenRefresh from '../../data/tokenWhitelist/tokenRefresh'
import createTokens from '../../jwt/createTokens'

jest.mock('../../data/tokenWhitelist/tokenRefresh')
jest.mock('../../jwt/createTokens')

describe('refreshLogin', () => {
  it('should refresh login and return new tokens', () => {
    // Mock createTokens to return specific tokens
    ;(createTokens as jest.Mock).mockReturnValueOnce({
      access_token: 'newAccessToken',
      refresh_token: 'newRefreshToken',
    })

    // Execute the function
    const result = refreshLogin('testUser', true, { cookie: jest.fn() } as any)

    // Expectations
    expect(tokenRefresh).toHaveBeenCalledWith('testUser', {
      access_token: 'newAccessToken',
      refresh_token: 'newRefreshToken',
    })
    expect(result).toEqual('newAccessToken')
  })
})

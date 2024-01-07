import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import * as validateTokenModule from '../../utils/validation/validateToken'
import refreshLogin from '../../utils/validation/refreshLogin'
import refresh from './refresh'

jest.mock('../../utils/validation/validateToken')
jest.mock('../../utils/validation/refreshLogin')

describe('refresh', () => {
  let res: Response

  beforeEach(() => {
    res = {
      sendStatus: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response
  })

  it('should handle successful refresh', async () => {
    // Mock validateToken to resolve successfully
    const mockedValidateToken =
      validateTokenModule.default as jest.MockedFunction<
        typeof validateTokenModule.default
      >
    mockedValidateToken.mockResolvedValue('testUser')

    // Mock refreshLogin to return new tokens
    const mockedRefreshLogin = refreshLogin as jest.MockedFunction<
      typeof refreshLogin
    >
    mockedRefreshLogin.mockReturnValueOnce('newAccessToken')

    // Execute the function
    await refresh(
      { cookies: { refresh_token: 'oldRefreshToken' } } as UserRequest,
      res
    )

    // Expectations
    expect(validateTokenModule.default).toHaveBeenCalledWith(
      'refresh',
      'oldRefreshToken'
    )

    expect(res.send).toHaveBeenCalledWith('newAccessToken')
  })

  it('should handle failed refresh', async () => {
    // Mock validateToken to resolve to an error code
    const mockedValidateToken =
      validateTokenModule.default as jest.MockedFunction<
        typeof validateTokenModule.default
      >
    mockedValidateToken.mockResolvedValueOnce(401)

    // Execute the function
    await refresh(
      { cookies: { refresh_token: 'invalidRefreshToken' } } as UserRequest,
      res
    )

    // Expectations
    expect(validateTokenModule.default).toHaveBeenCalledWith(
      'refresh',
      'invalidRefreshToken'
    )
    expect(res.sendStatus).toHaveBeenCalledWith(401)
    expect(res.send).not.toHaveBeenCalled()
    expect(res.cookie).not.toHaveBeenCalled()
  })
})

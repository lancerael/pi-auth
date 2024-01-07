import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateUser from '../../utils/validation/validateUser'
import tokenRetire from '../../utils/data/tokenWhitelist/tokenRetire'
import logout from './logout'

jest.mock('../../utils/validation/validateUser')
jest.mock('../../utils/data/tokenWhitelist/tokenRetire')

describe('logout', () => {
  let res: Response
  let mockedValidateUser: jest.MockedFunction<typeof validateUser>
  let mockedTokenRetire: jest.MockedFunction<typeof tokenRetire>

  beforeEach(() => {
    mockedValidateUser = validateUser as jest.MockedFunction<
      typeof validateUser
    >
    mockedTokenRetire = tokenRetire as jest.MockedFunction<typeof tokenRetire>

    // Clear mock implementation and calls
    mockedValidateUser.mockClear()
    mockedTokenRetire.mockClear()

    // Reset mock implementation
    mockedValidateUser.mockResolvedValue('user')
    mockedTokenRetire.mockResolvedValue(true)

    res = {
      sendStatus: jest.fn(),
    } as unknown as Response
  })

  it('should return 401 if user validation fails', async () => {
    mockedValidateUser.mockResolvedValueOnce(401)

    await logout({} as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(401)
    expect(mockedTokenRetire).not.toHaveBeenCalled()
  })

  it('should return 503 if tokenRetire fails', async () => {
    mockedTokenRetire.mockResolvedValueOnce(false)

    await logout({} as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(503)
    expect(mockedTokenRetire).toHaveBeenCalledWith('user')
  })

  it('should return 200 on successful logout', async () => {
    await logout({} as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(200)
    expect(mockedTokenRetire).toHaveBeenCalledWith('user')
  })
})

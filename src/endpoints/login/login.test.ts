import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import login from './login'
import checkUserCredentials from '../../utils/data/users/checkUserCredentials'
import refreshLogin from '../../utils/validation/refreshLogin'

jest.mock('../../utils/data/users/checkUserCredentials')
jest.mock('../../utils/validation/refreshLogin')

const mockedCheckUserCredentials = checkUserCredentials as jest.MockedFunction<
  typeof checkUserCredentials
>
const mockedRefreshLogin = refreshLogin as jest.MockedFunction<
  typeof refreshLogin
>

describe('login function', () => {
  let res: Response

  beforeEach(() => {
    res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if username or password is missing', async () => {
    await login({ body: {} } as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(401)
    expect(res.send).not.toHaveBeenCalled()
  })

  it('should return 403 if checkUserCredentials returns false', async () => {
    mockedCheckUserCredentials.mockResolvedValueOnce(false)

    await login(
      {
        body: { username: 'existingUser', password: 'testPassword' },
      } as UserRequest,
      res
    )

    expect(res.sendStatus).toHaveBeenCalledWith(403)
    expect(res.send).not.toHaveBeenCalled()
  })

  it('should return 200 with refreshed tokens on successful login', async () => {
    mockedCheckUserCredentials.mockResolvedValueOnce(true)
    mockedRefreshLogin.mockReturnValueOnce('mockedAccessToken')

    await login(
      {
        body: { username: 'existingUser', password: 'testPassword' },
      } as UserRequest,
      res
    )

    expect(res.sendStatus).not.toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith('mockedAccessToken')
  })
})

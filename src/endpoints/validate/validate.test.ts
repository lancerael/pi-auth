import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateUser from '../../utils/validation/validateUser'
import validate from './validate'

jest.mock('../../utils/validation/validateUser')

describe('validate', () => {
  let res: Response
  let mockedValidateUser: jest.MockedFunction<typeof validateUser>

  beforeEach(() => {
    mockedValidateUser = validateUser as jest.MockedFunction<
      typeof validateUser
    >

    // Clear mock implementation and calls
    mockedValidateUser.mockClear()

    // Reset mock implementation
    mockedValidateUser.mockResolvedValue('user')

    res = {
      sendStatus: jest.fn(),
    } as unknown as Response
  })

  it('should return 200 on successful validation', async () => {
    await validate({} as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(200)
    expect(mockedValidateUser).toHaveBeenCalled()
  })

  it('should return the validation status when validation fails', async () => {
    const expectedStatus = 401
    mockedValidateUser.mockResolvedValueOnce(expectedStatus)

    await validate({} as UserRequest, res)

    expect(res.sendStatus).toHaveBeenCalledWith(expectedStatus)
    expect(mockedValidateUser).toHaveBeenCalled()
  })
})

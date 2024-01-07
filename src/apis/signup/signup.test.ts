import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import addUser from '../../utils/data/users/addUser'
import signup from './signup'

jest.mock('../../utils/data/users/addUser')

// Mock express response methods
const sendMock = jest.fn()
const statusMock = jest.fn(() => ({ send: sendMock }))

const res = {
  status: statusMock,
  sendStatus: jest.fn(),
} as unknown as Response

describe('signup', () => {
  it('should handle successful signup', async () => {
    // Mock addUser to resolve successfully
    ;(addUser as jest.Mock).mockResolvedValueOnce(true)

    // Execute the function
    await signup(
      {
        body: {
          username: 'testUser',
          password: 'testPassword',
          email: 'test@example.com',
        },
      } as UserRequest,
      res
    )

    // Expectations
    expect(addUser).toHaveBeenCalledWith(
      'testUser',
      'testPassword',
      'test@example.com'
    )
    expect(statusMock).not.toHaveBeenCalled()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('should handle failed signup', async () => {
    // Mock addUser to return an error message
    ;(addUser as jest.Mock).mockResolvedValueOnce('User already exists')

    // Execute the function
    await signup(
      {
        body: {
          username: 'existingUser',
          password: 'testPassword',
          email: 'test@example.com',
        },
      } as UserRequest,
      res
    )

    // Expectations
    expect(addUser).toHaveBeenCalledWith(
      'existingUser',
      'testPassword',
      'test@example.com'
    )
    expect(statusMock).toHaveBeenCalledWith(400)
    expect(sendMock).toHaveBeenCalledWith('User already exists')
  })
})

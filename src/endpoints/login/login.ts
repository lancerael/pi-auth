import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import checkUserCredentials from '../../utils/data/users/checkUserCredentials'
import refreshLogin from '../../utils/validation/refreshLogin'

/**
 * Handles user login.
 *
 * @param {UserRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} A Promise resolving to the Express response object.
 */
export const login = async (
  req: UserRequest,
  res: Response
): Promise<Response> => {
  const { username, password, consent } = req?.body ?? {}

  // Handle missing username or password
  if (!username || !password) {
    return res.sendStatus(401)
  }

  // Check user credentials
  if (!(await checkUserCredentials(username, password))) {
    return res.sendStatus(403)
  }

  // Successful login, return refreshed token
  return res.send(refreshLogin(username, consent === 'true', res))
}

export default login

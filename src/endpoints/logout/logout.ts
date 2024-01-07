import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateUser from '../../utils/validation/validateUser'
import tokenRetire from '../../utils/data/tokenWhitelist/tokenRetire'

/**
 * Handles user logout.
 *
 * @param {UserRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} A Promise that resolves after handling the logout process.
 */
export const logout = async (
  req: UserRequest,
  res: Response
): Promise<Response> => {
  // Validates the user's credentials and checks the token whitelist.
  const username = await validateUser(req)

  // Handle validation failure
  if (typeof username === 'number') {
    return res.sendStatus(username)
  }

  // Attempt to retire the user's token
  const isTokenRetired = await tokenRetire(username)

  // Return status
  return res.sendStatus(isTokenRetired ? 200 : 503)
}

export default logout

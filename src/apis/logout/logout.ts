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
const logout = async (req: UserRequest, res: Response): Promise<Response> => {
  // Validates the user's credentials and checks the token whitelist.
  const validationStatus = await validateUser(req)

  // Handle validation failure
  if (validationStatus !== 200) {
    return res.sendStatus(validationStatus)
  }

  // Attempt to retire the user's token
  const isTokenRetired = await tokenRetire(req.body.username)

  // Return status
  return res.sendStatus(isTokenRetired ? 200 : 503)
}

export default logout

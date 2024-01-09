import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateToken from '../../utils/validation/validateToken'
import refreshLogin from '../../utils/validation/refreshLogin'

/**
 * Handles token refresh for a user.
 *
 * @param {UserRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to send a new access token
 */
export const refresh = async (req: UserRequest, res: Response) => {
  const { refresh_token } = req.cookies

  const username = await validateToken('refresh', refresh_token)
  if (typeof username === 'number') return res.sendStatus(username)
  return res.send(refreshLogin(username, true, res))
}

export default refresh

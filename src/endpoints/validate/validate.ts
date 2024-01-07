import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateUser from '../../utils/validation/validateUser'

/**
 * Handles user validation.
 *
 * @param {UserRequest} req - User request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} A Promise that resolves after handling the validation process.
 */
export const validate = async (req: UserRequest, res: Response) => {
  const username = await validateUser(req)
  return res.sendStatus(typeof username === 'string' ? 200 : username)
}

export default validate

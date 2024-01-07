import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import addUser from '../../utils/data/users/addUser'

/**
 * Handles the signup endpoint, creating a new user.
 * @param {UserRequest} req - The express request object.
 * @param {Response} res - The express response object.
 * @returns {Promise<void>} A promise representing the completion of the signup process.
 */
export const signup = async (
  req: UserRequest,
  res: Response
): Promise<Response> => {
  const { username, password, email } = req.body
  const result = await addUser(username, password, email)

  if (typeof result === 'string') {
    return res.status(400).send(result)
  } else {
    return res.sendStatus(200)
  }
}

export default signup

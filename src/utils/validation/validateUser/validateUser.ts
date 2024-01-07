import { UserRequest } from '../../../auth/auth.types'
import validateToken from '../validateToken'

/**
 * Validates a user based on the information provided in the request object.
 * @param {UserRequest} req - The request object containing user information.
 * @returns {Promise<200 | 401 | 403>} Promise resolved to HTTP status code.
 */
const validateUser = async (req: UserRequest): Promise<number> => {
  const { authorization } = req.headers
  const access_token = authorization?.split(' ')[1]

  return await validateToken('access', access_token)
}

export default validateUser

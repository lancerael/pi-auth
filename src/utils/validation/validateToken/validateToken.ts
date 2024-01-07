import checkToken from '../../data/tokenWhitelist/checkToken'
import { TokenType } from '../../jwt/jwt.types'
import verifyToken from '../../jwt/verifyToken'

/**
 * Validates a JSON Web Token (JWT) based on its authenticity and whitelist status.
 * @param {TokenType} type - The type of the token (access or refresh).
 * @param {string} username - The username associated with the token.
 * @param {string} token - The JWT to be validated.
 * @returns {Promise<401 | 403 | string>} A promise resolving to a username or HTTP error code.
 */
const validateToken = async (
  type: TokenType,
  token?: string
): Promise<401 | 403 | string> => {
  if (!token) return 401

  const username = verifyToken(token, type)
  const isTokenWhitelisted = await checkToken(token, type)

  if (!username || !isTokenWhitelisted) {
    return 403
  }

  return username
}

export default validateToken

import jwt from 'jsonwebtoken'
import { TOKEN_SECRETS } from '../../../constants'
import { AuthUser } from '../../../auth/auth.types'
import { TokenType } from '../jwt.types'

/**
 * Verifies the authenticity of a JSON Web Token (JWT).
 * @param {string} token - The JWT to be verified.
 * @param {TokenType} type - The type of the token (access or refresh).
 * @returns {boolean} True if the token is valid; otherwise, false.
 */
const verifyToken = (token: string, type: TokenType): boolean => {
  try {
    // Attempt to verify the JWT and extract the username
    const verifiedUser = jwt.verify(token, TOKEN_SECRETS[type]) as AuthUser
    return !!verifiedUser.username
  } catch (e) {
    // Return false if an error occurs during token verification
    return false
  }
}

export default verifyToken

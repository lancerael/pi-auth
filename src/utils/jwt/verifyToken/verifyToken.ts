import jwt from 'jsonwebtoken'
import { TOKEN_SECRETS } from '../../../constants'
import { AuthUser } from '../../../auth/auth.types'
import { TokenType } from '../jwt.types'

/**
 * Verifies the authenticity of a JSON Web Token (JWT).
 * @param {string} token - The JWT to be verified.
 * @param {TokenType} type - The type of the token (access or refresh).
 * @returns {string} Username if the token is valid; otherwise, empty string.
 */
const verifyToken = (token: string, type: TokenType): string => {
  try {
    // Attempt to verify the JWT and extract the username
    const verifiedUser = jwt.verify(token, TOKEN_SECRETS[type]) as AuthUser
    return verifiedUser.username ?? ''
  } catch (e) {
    // Return false if an error occurs during token verification
    return ''
  }
}

export default verifyToken

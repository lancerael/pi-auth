import jwt from 'jsonwebtoken'
import { TOKEN_SECRETS } from '../../../constants'
import { TokenType } from '../jwt.types'

/**
 * Creates a JSON Web Token (JWT) for a user.
 * @param {string} username - The username of the user.
 * @param {TokenType} type - The type of the token (access or refresh).
 * @param {string} expiresIn - The expiration time of the token.
 * @returns {string} The generated JWT or an empty string if an error occurs.
 */
const createToken = (
  username: string,
  type: TokenType,
  expiresIn: string
): string => {
  try {
    // Sign the JWT using the appropriate secret key
    return jwt.sign({ username }, TOKEN_SECRETS[type], {
      expiresIn,
    })
  } catch (e) {
    // Return an empty string if an error occurs during token creation
    return ''
  }
}

export default createToken

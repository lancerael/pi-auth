import createToken from '../createToken/createToken'
import { Tokens } from '../jwt.types'

/**
 * Creates both access and refresh tokens for a user.
 * @param {string} username - The username of the user.
 * @returns {Tokens} An object containing both access and refresh tokens.
 */
const createTokens = (username: string): Tokens => {
  return {
    access_token: createToken(username, 'access', '15m'),
    refresh_token: createToken(username, 'refresh', '7m'),
  }
}

export default createTokens

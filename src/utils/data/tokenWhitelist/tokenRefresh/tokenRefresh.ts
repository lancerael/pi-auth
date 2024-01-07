import { Tokens } from '../../../jwt/jwt.types'
import makeQuery from '../../makeQuery'

/**
 * Refreshes user tokens in the token whitelist.
 * @param {string} username - The username of the user.
 * @param {Tokens} tokens - An object containing new access and refresh tokens.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the tokens were refreshed successfully.
 */
const tokenRefresh = async (
  username: string,
  tokens: Tokens
): Promise<boolean> => {
  // Refresh user tokens in the token whitelist
  return !!(await makeQuery('tokenRefresh', {
    messages: ['logging in', 'User logged in'],
    args: { username, ...tokens },
  }))
}

export default tokenRefresh

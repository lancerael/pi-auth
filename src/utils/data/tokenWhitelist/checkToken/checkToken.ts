import { TokenType } from '../../../jwt/jwt.types'
import makeQuery from '../../makeQuery'

/**
 * Checks the validity of a user token in the token whitelist.
 * @param {string} username - The username of the user.
 * @param {string} token - The token to be checked.
 * @param {TokenType} type - The type of the token (access or refresh).
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the token is valid.
 */
const checkToken = async (token: string, type: TokenType): Promise<boolean> => {
  // Check the token against the token whitelist in the database
  const response = await makeQuery('checkToken', {
    messages: ['checking token', 'Token checked'],
    args: { [`${type}_token`]: token },
    cols: { token_type: `${type}_token` },
  })

  // Return true if the token is found in the whitelist, false otherwise
  return response?.rows?.length === 1
}

export default checkToken

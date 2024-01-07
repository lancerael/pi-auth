import makeQuery from '../../makeQuery'

/**
 * Retires user tokens in the token whitelist, logging the user out.
 * @param {string} username - The username of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the tokens were retired successfully.
 */
const tokenRetire = async (username: string): Promise<boolean> => {
  // Retire user tokens in the token whitelist
  const response = await makeQuery('tokenRetire', {
    messages: ['logging out', 'User logged out'],
    args: { username },
  })

  // Return true if the tokens are retired successfully, false otherwise
  return !!response
}

export default tokenRetire

import bcrypt from 'bcrypt'
import makeQuery from '../../makeQuery'

/**
 * Checks the credentials of a user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password to check against the stored hashed password.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the credentials are valid.
 */
const checkUserCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  // Retrieve user credentials from the database
  const response = await makeQuery('checkUserCredentials', {
    args: { username },
  })

  if (!response?.rows[0]?.password_hash) return false

  // Compare the provided password with the stored hashed password
  return await bcrypt.compare(password, response.rows[0].password_hash)
}

export default checkUserCredentials

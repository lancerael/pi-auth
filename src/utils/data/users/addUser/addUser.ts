import bcrypt from 'bcrypt'
import makeQuery from '../../makeQuery'

const SALT_ROUNDS = 10

/**
 * Adds a new user to the system.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} email - The email address of the new user.
 * @returns {Promise<string | boolean>} A promise that resolves to a string (error message) or a boolean (success indicator).
 */
const addUser = async (username: string, password: string, email: string) => {
  // Check if the user already exists
  const userAlreadyExists = await makeQuery('checkUserExists', {
    args: { username, email },
  })

  // If the user already exists, return an error message
  if (userAlreadyExists?.rows?.length) {
    return 'User may exist already - try logging in, or create a user with a different name and/or email.'
  }

  // Hash the password
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

  // Add the user to the database and return the success status
  return !!(await makeQuery('addUser', {
    messages: ['adding user', 'User created'],
    args: { username, email, password_hash },
  }))
}

export default addUser

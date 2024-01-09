import { Response } from 'express'
import tokenRefresh from '../../data/tokenWhitelist/tokenRefresh'
import createTokens from '../../jwt/createTokens'
import { IS_DEV, ORIGIN } from '../../../constants'

/**
 * Refreshes the login for a user by generating new tokens and refreshing the whitelist.
 * @param {string} username - The username of the user.
 * @returns {object} An object containing new access and refresh tokens.
 */
const refreshLogin = (username: string, consent: boolean, res: Response) => {
  // Create new tokens for the user
  const tokens = createTokens(username)

  // Updating the refresh token in the whitelist
  tokenRefresh(username, tokens)

  // Set an HTTP-only cookie with the refresh token
  consent &&
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: !IS_DEV,
      secure: !IS_DEV,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ORIGIN?.match(/^http:\/\/([^:/]+)(?::\d+)?/)?.[1] as string,
      path: '/',
    })

  // Return the new tokens
  return tokens.access_token
}

export default refreshLogin

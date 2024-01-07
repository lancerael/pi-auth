import { Response } from 'express'
import { UserRequest } from '../../auth/auth.types'
import validateToken from '../../utils/validation/validateToken'
import refreshLogin from '../../utils/validation/refreshLogin'

const refresh = async (req: UserRequest, res: Response) => {
  const { username } = req.body
  const { refresh_token } = req.cookies

  const status = await validateToken('refresh', refresh_token)
  if (status !== 200) return res.sendStatus(status)
  return res.json(refreshLogin(username, res))
}

export default refresh

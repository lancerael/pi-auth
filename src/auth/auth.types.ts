import { Request } from 'express'

export interface AuthUser {
  username: string
  password: string
  email: string
  refresh_token: string
}

export interface UserRequest extends Request {
  body: AuthUser
}

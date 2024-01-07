import dotenv from 'dotenv'

dotenv.config()

export const IS_DEV = process.env.NODE_ENV === 'dev'

export const ORIGIN = IS_DEV ? process.env.DEV_URL : process.env.PROD_URL

export const TOKEN_SECRETS = {
  access: process.env.JWT_SECRET!,
  refresh: process.env.REFRESH_SECRET!,
}

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { ORIGIN } from './constants'
import auth from './auth'

dotenv.config()

const app = express()

app.use(
  cookieParser(),
  cors({
    origin: ORIGIN,
    credentials: true,
  })
)

app.use('/auth', auth)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

export default app

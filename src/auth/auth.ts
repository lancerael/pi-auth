import express from 'express'
import { signup, login, logout, refresh, validate } from '../endpoints'

// Set up express
const router = express.Router()
router.use(express.json())

router.post('/signup', signup)
router.post('/login', login)
router.get('/validate', validate)
router.get('/refresh', refresh)
router.delete('/logout', logout)

export default router

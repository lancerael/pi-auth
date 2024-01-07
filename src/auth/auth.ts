import express from 'express'
import signup from '../apis/signup'
import login from '../apis/login'
import validate from '../apis/validate'
import refresh from '../apis/refresh'
import logout from '../apis/logout'

// Set up express
const router = express.Router()
router.use(express.json())

router.post('/signup', signup)
router.post('/login', login)
router.get('/validate', validate)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router

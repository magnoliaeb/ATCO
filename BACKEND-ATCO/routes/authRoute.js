import express from 'express'
import authController from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/me', verifyToken, authController.myProfile)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router

import express from 'express'
import departamentController from '../controllers/departamentController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', verifyToken, departamentController.getDepartaments)

export default router

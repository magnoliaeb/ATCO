import express from 'express'
import negotiationTypeController from '../controllers/negotiationTypeController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', verifyToken, negotiationTypeController.getNegotiationTypes)

export default router

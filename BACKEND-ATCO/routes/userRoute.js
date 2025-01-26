import express from 'express'
import userController from '../controllers/userController.js'
import { verifyAdmin, verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', [verifyToken, verifyAdmin], userController.getUsers)
router.get('/:id', [verifyToken, verifyAdmin], userController.getUserById)
router.post('/create', [verifyToken, verifyAdmin], userController.createUser)
router.put('/edit/:id', [verifyToken, verifyAdmin], userController.editUser)
router.put('/update-status/:id', [verifyToken, verifyAdmin], userController.updateStatus)
router.delete('/delete/:id', [verifyToken, verifyAdmin], userController.deleteUser)

export default router

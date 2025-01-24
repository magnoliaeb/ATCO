import express from 'express'
import userController from '../controllers/userController.js'
// import {verifyToken} from '../middlewares/authMiddleware.js';
const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/create', userController.createUser)
router.put('/edit/:id', userController.editUser)
router.put('/update-status/:id', userController.updateStatus)
router.delete('/delete/:id', userController.deleteUser)

export default router

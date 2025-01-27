import express from 'express'
import customerController from '../controllers/customerController.js'
import { verifyAdmin, verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', [verifyToken, verifyAdmin], customerController.getAllCustomers)
router.get('/:id', [verifyToken, verifyAdmin], customerController.getCustomerById)
router.post('/create', [verifyToken, verifyAdmin], customerController.createCustomer)
router.put('/edit/:id', [verifyToken, verifyAdmin], customerController.editCustomer)
router.delete('/delete/:id', [verifyToken, verifyAdmin], customerController.deleteCustomer)

export default router

import express from 'express'
import quoteController from '../controllers/quoteController.js'
import { verifyAdmin, verifyToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', [verifyToken], quoteController.getQuotes)
router.get('/:id', [verifyToken, verifyAdmin], quoteController.getQuoteById)
router.post('/create', [verifyToken, verifyAdmin], quoteController.creteQuote)
router.put('/edit/:id', [verifyToken, verifyAdmin], quoteController.editQuote)
// router.put('/update-status/:id', [verifyToken, verifyAdmin], quoteController.updateStatus)
router.delete('/delete/:id', [verifyToken, verifyAdmin], quoteController.deleteQuote)

export default router

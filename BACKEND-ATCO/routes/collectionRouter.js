import express from 'express';
import collectionController from '../controllers/collectionController.js';
import {verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', collectionController.getAllCollections);
// router.get('/:handle', collectionController.getCollectionByHandle);
// router.post('', verifyToken, collectionController.createCollection);
// router.put('/:handle', verifyToken, collectionController.updateCollection);
// router.delete('/:handle', verifyToken, collectionController.deleteCollection);


export default router;
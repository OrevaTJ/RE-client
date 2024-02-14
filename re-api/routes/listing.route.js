import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import {
  createListing,
  deleteListing,
  updateListing,
  getSingleListing,
  getListings
} from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/:id', getSingleListing);
router.get('/', getListings);

export default router;

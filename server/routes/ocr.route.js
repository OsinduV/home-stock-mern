import express from 'express';
import {ocr} from '../controllers/ocr.controller.js';

const router = express.Router();

router.post('/scan', ocr);

export default router;
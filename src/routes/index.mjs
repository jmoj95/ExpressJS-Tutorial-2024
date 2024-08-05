import { Router } from 'express';

import userRouter from './user.mjs';
import productRouter from './product.mjs';
import middlewareTestRouter from './middlewareTest.mjs'

const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/middlewaretest', middlewareTestRouter);

export default router;

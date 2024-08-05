import { Router } from 'express';

import * as productsHelper from '../helpers/productHelper.mjs';

const router = Router();

router.get('/', (req, res) => {
    res.send(productsHelper.getAllProducts());
});

export default router;

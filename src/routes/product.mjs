import { Router } from 'express';

import * as productsHelper from '../helpers/productHelper.mjs';
import * as responseHelper from '../helpers/responseHelper.mjs';

const router = Router();

router.get('/', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies['hello']);

    const helloCookie = req.signedCookies['hello'];
    if (!helloCookie || helloCookie !== 'world' ) {
        return res.status(403).send(responseHelper.getErrorResponse('Incorrect or expired cookie'));
    }

    return res.send(productsHelper.getAllProducts());
});

export default router;

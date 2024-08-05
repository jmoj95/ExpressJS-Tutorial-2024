import { Router } from 'express';

import loggingMiddleware from '../middlewares/loggingMiddleware.mjs';

const router = Router();

// Middleware Global Use (calls before every endpoint)
// Middlewwares must be registered before endpoints before being used by them
// router.use(loggingMiddleware);

router.use(loggingMiddleware, (req, res, next) => {
    console.log('Finished logging...');
    next();
});

router.get(
    '/',
    (req, res, next) => {
        console.log('Base URL 1');
        next();
    },
    (req, res, next) => {
        console.log('Base URL 2');
        next();
    },
    (req, res, next) => {
        console.log('Base URL 3');
        next();
    },
    (req, res) => {
        return res.status(200).send({ message: 'Hello' });
    }
);

export default router;

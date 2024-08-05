import { Router } from 'express';

import {
    validationResult,
    matchedData,
    checkSchema
} from 'express-validator';

import {
    createUserValidationSchema,
    createUserFilterSchema,
    userIdSchema
} from '../utils/validationSchemas.mjs';

import resolveIndexByUserId from '../middlewares/resolveIndexByUserId.mjs';
import * as userHelper from '../helpers/userHelper.mjs';
import * as responseHelper from '../helpers/responseHelper.mjs';

const router = Router();

router.get(
    '/',
    checkSchema(createUserFilterSchema),
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send( { errors: result.array() });
        }

        const data = matchedData(req);
        const { filter, value } = data;
        if (filter && value) {
            const filteredUsers = userHelper.filterUsers(filter, value);
            return res.send(filteredUsers);
        }

        return res.send(userHelper.getAllUsers());
    }
);

router.post(
    '/',
    checkSchema(createUserValidationSchema),
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send( { errors: result.array() });
        }

        const data = matchedData(req);
        const newUser = userHelper.createUser(data);

        return res.send(newUser);
    }
);

router.get(
    '/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const { parsedId } = req;

        const user = userHelper.findUserById(parsedId);
        if (!user) {
            return res.status(404).send(responseHelper.getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

router.put(
    '/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const {
            body,
            parsedId
        } = req;

        const user = userHelper.putUser(parsedId, body);
        if (!user) {
            return res.status(404).send(responseHelper.getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

router.patch(
    '/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const {
            body,
            parsedId
        } = req;

        const user = userHelper.patchUser(parsedId, body);
        if (!user) {
            return res.status(404).send(responseHelper.getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

router.delete(
    '/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const { parsedId } = req;

        userHelper.deleteUser(parsedId);

        return res.sendStatus(200);
    }
);

export default router;

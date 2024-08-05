import express from 'express';

import {
    validationResult,
    matchedData,
    checkSchema
} from 'express-validator';

import resolveIndexByUserId from './middlewares/resolveIndexByUserId.mjs';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';

import * as userHelper from './helpers/userHelper.mjs';

import {
    createUserValidationSchema,
    createUserFilterSchema,
    userIdSchema
} from './utils/validationSchemas.mjs';

const app = express();

app.use(express.json());

// Middleware Global Use (calls before every endpoint)
// Middlewwares must be registered before endpoints before being used by them
// app.use(loggingMiddleware);

const PORT = process.env.PORT;

const mockProducts = [
    { id: 123, name: 'Chicken Breast', price: 12.99 }
];

const getErrorResponse = (message) => {
    return {
        error: true,
        message: message
    };
};

app.get('/', loggingMiddleware, (req, res) => {
    res.send({
        message: 'Hello, world!!!'
    });
});

app.get(
    '/middlewaretest',
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

app.use(loggingMiddleware, (req, res, next) => {
    console.log('Finished logging...');
    next();
});

app.get(
    '/api/users',
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

app.post(
    '/api/users',
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

app.get(
    '/api/users/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const { parsedId } = req;

        const user = userHelper.findUserById(parsedId);
        if (!user) {
            return res.status(404).send(getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

app.get('/api/products', (req, res) => {
    res.send(mockProducts);
});

app.put(
    '/api/users/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const {
            body,
            parsedId
        } = req;

        const user = userHelper.putUser(parsedId, body);
        if (!user) {
            return res.status(404).send(getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

app.patch(
    '/api/users/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const {
            body,
            parsedId
        } = req;

        const user = userHelper.patchUser(parsedId, body);
        if (!user) {
            return res.status(404).send(getErrorResponse('User not found'));
        }

        return res.send(user);
    }
);

app.delete(
    '/api/users/:id',
    checkSchema(userIdSchema),
    resolveIndexByUserId,
    (req, res) => {
        const { parsedId } = req;

        userHelper.deleteUser(parsedId);

        return res.sendStatus(200);
    }
);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

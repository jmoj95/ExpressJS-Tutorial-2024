import {
    validationResult,
    matchedData
} from 'express-validator';

const resolveIndexByUserId = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send( { errors: result.array() });
    }

    const { id } = matchedData(req);
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send(getErrorResponse('Invalid ID'));
    }

    req.parsedId = parsedId;

    return next();
};

export default resolveIndexByUserId;

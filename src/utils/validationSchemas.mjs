export const createUserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'Username cannot be empty.'
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: 'Username must be at least 5-32 characters'
        },
        isString: {
            errorMessage: 'Username must be a string'
        }
    },
    displayName: {
        notEmpty: {
            errorMessage: 'Display Name cannot be empty.'
        }
    }
};

export const createUserFilterSchema = {
    filter: {
        optional: true,
        isString: {
            errorMessage: 'Filter must be a string'
        },
        notEmpty: {
            errorMessage: 'Filter cannot be empty.'
        },
        isLength: {
            options: {
                min: 3,
                max: 11
            },
            errorMessage: 'Filter must be at least 3-11 characters'
        },
    },
    value: {
        optional: true,
        isString: {
            errorMessage: 'Filter must be a string'
        }
    }
};

export const userIdSchema = {
    id: {
        notEmpty: {
            errorMessage: 'ID cannot be empty'
        },
        isInt: {
            options: {
                min: 0,
                allow_leading_zeroes: false
            },
            errorMessage: 'Invalid ID'
        }
    }
};

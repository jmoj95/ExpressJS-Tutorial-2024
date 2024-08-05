import * as userService from '../services/userService.mjs';

export const getAllUsers = () => {
    return userService.fetchAllUsers();
};

export const filterUsers = (filter, value) => {
    if (!filter || !value) {
        return null;
    }

    return userService.fetchFilteredUsers(filter, value);
};

export const findUserById = (id) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId < 0) {
        return null;
    }

    return userService.fetchUserById(parsedId);
};

export const createUser = (userData) => {
    return userService.createUser(userData);
};

export const putUser = (id, data) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId < 0) {
        return null;
    }
 
    return userService.putUser(parsedId, data);
};

export const patchUser = (id, data) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId < 0) {
        return null;
    }
 
    return userService.patchUser(parsedId, data);
};

export const deleteUser = (id) => {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId) && parsedId > 0) {
        userService.deleteUser(id);
    }
};

const mockUsers = [
    { id: 1, username: 'Anson', displayName: 'Anson' },
    { id: 2, username: 'Jack', displayName: 'Jack' },
    { id: 3, username: 'Adam', displayName: 'Adam' },
    { id: 4, username: 'Tina', displayName: 'Tina' },
    { id: 5, username: 'jason', displayName: 'Jason' },
    { id: 6, username: 'Henry', displayName: 'Henry' },
    { id: 7, username: 'Marilyn', displayName: 'Marilyn' }
];

export const fetchAllUsers = () => {
    return mockUsers;
};

export const fetchFilteredUsers = (filter, value) => {
    if (filter && value) {
        const filteredUsers = mockUsers.filter(user =>
            (filter in user) &&
            user[filter].toLowerCase().includes(value.toLowerCase()));
        return filteredUsers;
    }

    return mockUsers;
};

export const fetchUserById = (id) => {
    return mockUsers.find(user => user.id === id);
};

export const createUser = (userData) => {
    const newUser = { id: mockUsers.length + 1, ...userData };

    mockUsers.push(newUser);

    return newUser;
};

export const putUser = (id, userData) => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null;
    };

    const user = mockUsers[userIndex] = {
        id: id,
        ...userData
    };

    return user;
};

export const patchUser = (id, userData) => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null;
    };

    const user = mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...userData
    };

    return user;
};

export const deleteUser = (id) => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex > 0) {
        mockUsers.splice(userIndex, 1);
    };
};

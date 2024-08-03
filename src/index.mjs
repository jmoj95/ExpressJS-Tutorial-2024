import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

const mockUsers = [
    { id: 1, username: 'Anson', displayName: 'Anson' },
    { id: 2, username: 'Jack', displayName: 'Jack' },
    { id: 3, username: 'Adam', displayName: 'Adam' },
    { id: 4, username: 'Tina', displayName: 'Tina' },
    { id: 5, username: 'jason', displayName: 'Jason' },
    { id: 6, username: 'Henry', displayName: 'Henry' },
    { id: 7, username: 'Marilyn', displayName: 'Marilyn' }
];

const mockProducts = [
    { id: 123, name: 'Chicken Breast', price: 12.99 }
];

const isIdValid = (id) => {
    id = id.toString();
    const n1 = Math.abs(id);
    const n2 = parseInt(id, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === id;
};

const getErrorResponse = (message) => {
    return {
        error: true,
        message: message
    };
};

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!!!'
    });
});

app.get('/api/users', (req, res) => {
    const { query: { filter, value } } = req;    
    if (filter && value) {
        const filteredUsers = mockUsers.filter(user =>
            (filter in user) && user[filter].toLowerCase().includes(value.toLowerCase()));
        return res.send(filteredUsers);
    }

    return res.send(mockUsers);
});

app.post('/api/users', (req, res) => {
    const { body } = req;
    const newUser = { id: mockUsers.length + 1, ...body };
    mockUsers.push(newUser);
    return res.send(newUser);
});

app.get('/api/users/:id', (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isIdValid(parsedId)) {
        return res.status(400).send(getErrorResponse('Bad Request: Invalid ID.'));
    }

    const user = mockUsers.find(user => user.id === parsedId);
    if (!user) {
        return res.status(404).send(getErrorResponse('User not found'));
    }

    return res.send(user);
});

app.get('/api/products', (req, res) => {
    res.send(mockProducts);
});

app.put('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id }
    } = req;

    const parsedId = parseInt(id);
    if (!isIdValid(parsedId)) {
        return res.status(400).send(getErrorResponse('Bad Request: Invalid ID.'));
    }

    const userIndex = mockUsers.findIndex(user => user.id === parsedId);
    if (userIndex === -1) {
        return res.status(404).send(getErrorResponse('User not found'));
    }

    const user = mockUsers[userIndex] = {
        id: parsedId,
        ...body
    };

    return res.send(user);
});

app.patch('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id }
    } = req;

    const parsedId = parseInt(id);
    if (!isIdValid(parsedId)) {
        return res.status(400).send(getErrorResponse('Bad Request: Invalid ID.'));
    }

    const userIndex = mockUsers.findIndex(user => user.id === parsedId);
    if (userIndex === -1) {
        return res.status(404).send(getErrorResponse('User not found'));
    }

    const user = mockUsers[userIndex] = { ...mockUsers[userIndex], ...body };

    return res.send(user);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

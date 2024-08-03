import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: 'Anson', displayName: 'Anson' },
    { id: 2, username: 'Jack', displayName: 'Jack' },
    { id: 3, username: 'Adam', displayName: 'Adam' }
];

app.get('/', (req, res) => {
    res.send({
        message: "Hello, world!!!"
    });
});

app.get('/api/users', (req, res) => {
    res.send(mockUsers);
});

app.get('/api/users/:id', (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({
            error: true,
            message: "Bad Request: Invalid ID."
        });
    }

    const user = mockUsers.find(user => user.id === parsedId);
    if (!user) {
        return res.status(404).send({
            error: true,
            message: "User not found"
        });
    }

    return res.send(user);
});

app.get('/api/products', (req, res) => {
    res.send([
        { id: 123, name: 'Chicken Breast', price: 12.99 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({
        message: "Hello, world!!!"
    });
});

app.get('/api/users', (req, res) => {
    res.send([
        { id: 1, username: 'Anson', displayName: 'Anson' },
        { id: 2, username: 'Jack', displayName: 'Jack' },
        { id: 3, username: 'Adam', displayName: 'Adam' }
    ]);
});

app.get('/api/products', (req, res) => {
    res.send([
        { id: 123, name: 'Chicken Breast', price: 12.99 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

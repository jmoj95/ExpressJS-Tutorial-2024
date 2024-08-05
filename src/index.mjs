import express from 'express';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';
import routes from './routes/index.mjs';

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT;

app.get('/', loggingMiddleware, (req, res) => {
    res.send({
        message: 'Hello, world!!!'
    });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

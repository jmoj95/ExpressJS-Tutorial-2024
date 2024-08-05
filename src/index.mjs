import express from 'express';
import cookieParser from 'cookie-parser';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';
import routes from './routes/index.mjs';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use('/api', routes);

const PORT = process.env.PORT;

app.get('/', loggingMiddleware, (req, res) => {
    const helloCookie = req.signedCookies['hello'];
    if (!helloCookie || helloCookie !== 'world' ) {
        res.cookie('hello', 'world', {
            maxAge: 2 * 60 * 60 * 1000,
            signed: true
        });
    }

    return res.send({
        message: 'Hello, world!!!'
    });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';
import routes from './routes/index.mjs';

const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));
app.use('/api', routes);

app.get('/', loggingMiddleware, (req, res) => {
    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;

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

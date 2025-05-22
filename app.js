const express = require('express');
const db = require('./config/db');
const walletRouter = require('./routes/walletRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://servs.ufdevs.me', 'http://localhost:5174', 'http://localhost:5173', 'https://servs.ufdevs.me/login', 'https://ufdevs.me'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}));
app.get('/', (req, res) => {
    res.send('heloow');
});

app.use('/wallet', walletRouter);
app.use('/user', userRouter);

// app.listen(3000);
module.exports = app;
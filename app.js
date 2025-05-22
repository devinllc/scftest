const express = require('express');
const db = require('./config/db');
const walletRouter = require('./routes/walletRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('heloow');
});

app.use('/wallet', walletRouter);
app.use('/user', userRouter);

// app.listen(3000);
module.exports = app;
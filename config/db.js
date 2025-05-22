const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI:', MONGO_URI); // should not be undefined

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Optional: exit app if DB connection fails
    });

const dbConnection = mongoose.connection;

module.exports = dbConnection;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const app = express();

const userRoutes = require('./api/routes/users');
const connectionRoutes = require('./api/routes/connections');
const hospitalRoutes = require('./api/routes/hospitals');
const emailRoutes = require('./api/routes/emails');
const appointmentRoutes = require('./api/routes/appointments');

mongoose.connect(
    'mongodb://mayank:mayank@bscms-shard-00-00-m2sgv.mongodb.net:27017,bscms-shard-00-01-m2sgv.mongodb.net:27017,bscms-shard-00-02-m2sgv.mongodb.net:27017/test?ssl=true&replicaSet=BSCMS-shard-0&authSource=admin&retryWrites=true',
    {
        useMongoClient: true,  useNewUrlParser: true
    }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', userRoutes);
app.use('/connections', connectionRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/emails', emailRoutes);
app.use('/appointments', appointmentRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }

    });
});

module.exports = app; 
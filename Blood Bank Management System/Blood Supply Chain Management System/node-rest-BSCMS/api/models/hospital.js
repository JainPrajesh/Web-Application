const mongoose = require('mongoose');

const hospitalSchems = mongoose.Schema({
    hospitalName: String,
    hospitalRegistrationNumber: String,
    hospitalEmailId: String,
    hospitalStreetAddress: String,
    hospitalCity: String,
    hospitalZipCode: String,
    hospitalState: String,
    hospitalContactNumber: String,
    hospitalPassword: String
});

module.exports = mongoose.model('Hospital', hospitalSchems);
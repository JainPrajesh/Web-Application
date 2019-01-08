const express = require('express');
const router = express.Router();
const mangoose = require('mongoose');
const User = require('../models/user');

router.post('/authenicate', (req, res, next) => {
    const userName = req.body.emailId;
    const password = req.body.password;
    User.find(
        {
            emailId: userName,
            password: password
        }
    )
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:zipCode/:bloodGroup', (req, res, next) => {
    const zipCode = req.params.zipCode;
    const bloodGroup = req.params.bloodGroup;
    User.find(
        {
            zipCode: zipCode,
            bloodGroup: bloodGroup
        }
    )
        .exec()
        .then(docs => {
            res.status(200).json(docs);
            console.log(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:emailId', (req, res, next) => {
    const emailId = req.params.emailId;
    User.find(
        {
            emailId: emailId
        }
    )
        .exec()
        .then(docs => {
            res.status(200).json(docs);
            console.log(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.put('/:userName', (req, res, next) => {
    const emailId = req.params.userName;
    console.log("Put Email Id " + emailId);
    User.updateMany({ emailId: emailId }, {
        $set:
        {
            name: req.body.name,
            emailId: req.body.emailId,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            zipCode: req.body.zipCode,
            state: req.body.state,
            gender: req.body.gender,
            dateofBirth: req.body.dateofBirth,
            bloodGroup: req.body.bloodGroup,
            contactNumber: req.body.contactNumber,
        }
    }).exec()
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err);
        });
    res.status(201).json({
        message: 'Handling PUT requests to /Connections',
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.update({ _id: id }, { $set: { emailId: req.body.emailId } })
});

router.post('/', (req, res, next) => {

    console.log("Body From POST " + req.body.name);
    const user = new User({
        name: req.body.name,
        emailId: req.body.emailId,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        gender: req.body.gender,
        dateofBirth: req.body.dateofBirth,
        bloodGroup: req.body.bloodGroup,
        contactNumber: req.body.contactNumber,
        password: req.body.password
    });
    user.save().then((result) => {

        console.log(result)
    }).catch((err) => {
        console.log(err);
    });;
    res.status(201).json({
        message: 'Handling POST requests to /User',
        user: user
    });
});

module.exports = router;
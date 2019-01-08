const express = require('express');
const router = express.Router();
const mangoose = require('mongoose');
const Appointment = require('../models/appointment');

router.get('/:emailId', (req, res, next) => {
    const emailId = req.params.emailId;
    Appointment.find({ $or: [{ senderUserEmailId : emailId }, { hospitalEmailId : emailId }] })
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



router.get('/:senderUserEmailId/:hospitalEmailId', (req, res, next) => {
    const senderUserEmailId = req.params.senderUserEmailId;
    const hospitalEmailId = req.params.hospitalEmailId;
    Appointment.find({ hospitalEmailId: hospitalEmailId, senderUserEmailId: senderUserEmailId })
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

router.post('/', (req, res, next) => {

    const appointment = new Appointment({

        senderUserEmailId: req.body.senderUserEmailId,
        senderUserName: req.body.senderUserName,
        senderUserBloodGroup: req.body.senderUserBloodGroup,
        hospitalName: req.body.hospitalName,
        hospitalEmailId: req.body.hospitalEmailId,
        hospitalStreetAddress: req.body.hospitalStreetAddress,
        hospitalCity: req.body.hospitalCity,
        hospitalZipCode: req.body.hospitalZipCode,
        hospitalState: req.body.hospitalState,
        hospitalContactNumber: req.body.hospitalContactNumber,
        appointmentStatus: req.body.appointmentStatus,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
    });
    appointment.save().then((result) => {

        console.log(result)
    }).catch((err) => {
        console.log(err);
    });;
    res.status(201).json({
        message: 'Handling POST requests to /Appointments',
        appointment: appointment
    });
});


router.put('/:senderUserEmailId/:hospitalEmailId', (req, res, next) => {
    const senderUserEmailId = req.params.senderUserEmailId;
    const hospitalEmailId = req.params.hospitalEmailId;
    console.log(senderUserEmailId+" "+hospitalEmailId+" "+req.body.appointmentDate)
    Appointment.updateOne({ senderUserEmailId: senderUserEmailId, hospitalEmailId: hospitalEmailId }, {
        $set:
        {
            appointmentStatus: req.body.appointmentStatus,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
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


router.delete("/:senderUserEmailId/:hospitalEmailId", (req, res, next) => {
    const senderUserEmailId = req.params.senderUserEmailId;
    const hospitalEmailId = req.params.hospitalEmailId;
    Appointment.remove({ senderUserEmailId: senderUserEmailId, hospitalEmailId: hospitalEmailId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
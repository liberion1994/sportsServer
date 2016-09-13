var express = require('express');
var router = express.Router();
var Campus = require('../models/Court').Campus;
var Court = require('../models/Court').Court;
var Play = require('../models/Court').Play;


var baseArgs = '-_id -__v';

router.get('/', function(req, res, next) {
    Campus.find(function (err, campuses) {
        if (err)
            return console.error(err);
        res.send(campuses);
    })
});

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    Campus.findOne({ name: name }, function (err, campuses) {
        if (err)
            return console.error(err);
        res.send(campuses);
    })
});

router.get('/:campusName/courts', function (req, res, next) {
    var campusName = req.params.campusName;
    var sportsType = req.query.sportsType;
    if (!sportsType) {
        Court.find({campusName: campusName}, baseArgs, function (err, courts) {
            if (err)
                return console.error(err);
            res.send(courts);
        })
    } else {
        Court.find({campusName: campusName, sportsType: sportsType }, baseArgs, function (err, courts) {
            if (err)
                return console.error(err);
            res.send(courts);
        })
    }
});

router.get('/:campusName/courts/:name', function (req, res, next) {
    var campusName = req.params.campusName;
    var name = req.params.name;
    Court.findOne({ campusName: campusName, name: name }, baseArgs, function (err, courts) {
        if (err)
            return console.error(err);
        res.send(courts);
    })
});

router.get('/:campusName/courts/:name/plays', function (req, res, next) {
    var campusName = req.params.campusName;
    var name = req.params.name;
    var date = new Date(req.query.date);
    var date2 = new Date(date.getTime() + (24 * 3600 * 1000));
    console.log("FROM " + date + "," + req.query.date);
    if (date) {
        Play.find({
            campusName: campusName,
            courtName: name,
            startDate: {
                $gte: date,
                $lt: date2
            }
        }, baseArgs).sort('startDate').exec(function (err, plays) {
            if (err)
                return console.error(err);
            res.send(plays);
        })
    } else {
        res.send([]);
    }
});

module.exports = router;

var mongodb = require('./mongodb');

var campusSchema = mongodb.mongoose.Schema({
    name : String,
    sportsTypes : [{
        sportsType : String,
        count: Number
    }],
    description: String

});

var courtSchema = mongodb.mongoose.Schema({
    name : String,
    campusName : String,
    addressInCampus: String,
    sportsType : String,
    description : String
});

var playSchema = mongodb.mongoose.Schema({
    campusName : String,
    courtName : String,
    startDate : Date,
    endDate : Date,
    bookable: Boolean

});


var Campus = mongodb.mongoose.model('Campuz', campusSchema);
var Court = mongodb.mongoose.model('Court', courtSchema);
var Play = mongodb.mongoose.model('Play', playSchema);

exports.Campus = Campus;
exports.Court = Court;
exports.Play = Play;
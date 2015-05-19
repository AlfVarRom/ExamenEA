/**
 * Created by Administrador on 08/05/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
        name: {type: String},
        username: {type: String},
        password: {type: String},
        email: {type: String},
        age: {type: Number},
        nation:{type:String},
        description:{type:String}
    },
    {versionKey: false});

module.exports = mongoose.model('User', schema);

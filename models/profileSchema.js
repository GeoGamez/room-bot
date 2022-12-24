const {Schema, model, models} = require('mongoose');


const profileSchema = new Schema({
    userid: {type: String, required: true, unique: true},
    serverID: {type: String, required: true, unique: false},
    susoin: {type: Number, default: 1000, unique: false},
    bank: {type: Number}
})
const name = "profile";

module.exports = models[name] || model(name, profileSchema);
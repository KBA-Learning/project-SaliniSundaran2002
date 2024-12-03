const {Schema, default: mongoose} = require("mongoose")


const userSchema = Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    username: { type: String},
    password: String,
    role: String

})
module.exports = mongoose.model('userdetails', userSchema)

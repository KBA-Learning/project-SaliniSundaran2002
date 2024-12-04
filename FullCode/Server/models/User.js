const {Schema, default: mongoose} = require("mongoose")


const userSchema = Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    username: { type: String},
    password: String,
    role: String,
    trainingTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingTask', 
          }],

})
module.exports = mongoose.model('userdetails', userSchema)

const mongoose = require('mongoose');

const updatedUserProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    firstname:String,
    lastname:String,
    email:String,
    address: String,
    phone: String,
    role:String,
    // profilePic: String,
    updatedAt: { type: Date, default: Date.now },
  });
const UpdatedProfile = mongoose.model("UserUpdateDetails",updatedUserProfileSchema)

module.exports = UpdatedProfile  


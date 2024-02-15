const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    arrofEmpUnder: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    categoryofMinistry: {
        type: String,
        required: true,
    },
    newsofMinistry: {
        type: Number,
        default: 0,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    isblocked: {
        type: Boolean,
        default: false,
    },
    DOB: {
        type: Date,
        default: Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


//userid,name,pass,email,Ministry name,mobile number, array of employees under him/her,DOB,blocked
//Number of News of Ministry,categoryofMinistry

const User = mongoose.model('User', Userschema)
module.exports = User
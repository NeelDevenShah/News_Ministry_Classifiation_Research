const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    ministry: {
        type: String,
        default: ""
    },
    sentiment: {
        type: String,
        default: ""
    },
    validation: {
        type: String,
        default: "real"
    },
    tag: {
        type: String,
        default: "general"
    },
    url: {
        type: String,
        default: ""
    },
    imageurl: {
        type: String,
        default: ""
    },
    language: {
        type: String,
        default: "english"
    },
    geolocation: {
        type: String,
        default: "india"
    },
    publishedAt: {
        type: Date,
        default: Date.now(),
    },
    DBcreatedAt: {
        type: Date,
        default: Date.now(),
    },

})

const CL_News = mongoose.model('CL_News', NewsSchema)
module.exports = CL_News
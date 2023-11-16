const mongoose = require('mongoose')

const Schema = mongoose.Schema
const customerschema = new Schema({
    Customer_ID: {
        type: Number,
        required: true
    },
    Customer_name: {
        type: String,
        required: true
    },
    Contact_no: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Customer', customerschema)
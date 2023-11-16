const mongoose = require('mongoose')

const Schema = mongoose.Schema
const accountschema = new Schema({
    Customer_ID: {
        type: Number,
        required: true
    }, 
    Account_ID: {
        type: Number,
        required: true
    },
    Account_type: {
        type: String,
        required: true
    },
    Balance: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Account', accountschema)

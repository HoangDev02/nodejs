const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const cardSchema = new mongoose.Schema({
    name: {type: String ,  required: true,},
    amount: {type: String, required: true},
    price: {type:String, required: true,},
    currency: {type:String,},
    quantity: {type:String},
    sku: {type:String},
})

module.exports = mongoose.model('card', cardSchema)
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    address: String,
    eventName: String,
    date: String,
    city: String,
    state: String,
    zipcode: String

})
const Customer = mongoose.model('Customers',customerSchema);
module.exports = Customer;
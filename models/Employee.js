const mongoose = require("mongoose");
const conn = require('../config/db');

function addLastName(name) {
    return name + ' Verma';
}

function nameChange(params) {
    console.log("called");
    console.log(params)
    return "MR." + params;
}
const employeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        trim: true,
        set: addLastName,
        get: nameChange
        //min: 5 not work in string
        //max not work in string 
    },
    email: String,
    department: String,
    account: {
        mailId: String,
        age: {
            type: Number,
            min: [3, 'age not less than 3'],
            max: [80, 'not greater than 80']
        },
        phone: Number
    }
})

// for middleware
employeeSchema.pre('save', function (next) {
    console.log(this.account.phone);
    this.account.phone = '91' + this.account.phone;
    next()
})

// for getters method
employeeSchema.set('toObject', { getters: true });
employeeSchema.set('toJSON', { getters: true });

// methods
employeeSchema.methods.getDepartment = async function (data, cb) {
    let results = await this.model('employees').find(
        {},
        {}
    ).distinct('department');
    // let response = ['HR'];
    return cb(null, results);
}

// statics
employeeSchema.statics.getEmail = async function (data, cb) {
    let results = await this.model('employees').find(
        {},
        {}
    ).distinct('email');
    return cb(null, results);
}


//for multipldatabase
//let emp = mongoose.model('employees', employeeSchema);
let emp = conn.CodeImprove.model('employees', employeeSchema);

module.exports = emp;
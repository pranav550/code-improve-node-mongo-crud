const Employee = require("../models/Employee");
const mongoose = require("mongoose");
const addEmployee = (req, res) => {
    const data = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        account: {
            mailId: req.body.mailId,
            age: req.body.age,
            phone: req.body.phone
        }
    })
    data.save().then((result) => {
        res.status(200).json({ message: 'added', record: result })
    }).catch(err => {
        if (err.errors) {
            if (err.errors['name']) {
                res.status(500).json({ message: 'error', record: err.errors['name'].message })
            }
            if (err.errors['account.age']) {
                res.status(500).json({ message: 'error', record: err.errors['account.age'].message })
            }
        }
        if (err.code == 11000) {
            res.status(500).json({ message: 'error', record: "Duplicate name" })
        }
    })
}


const listEmployee = (req, res) => {
    Employee.find({}, (err, docs) => {
        if (err) throw err;
        res.status(200).json({ message: 'list', record: docs })
    })
}

const infoEmployee = (req, res) => {
    Employee.findById({ _id: req.params.id }, (err, docs) => {
        if (err) throw err;
        res.status(200).json({ message: 'info', record: docs })
    })
}

const updateEmployee = (req, res) => {
    Employee.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        },
        (err, docs) => {
            if (err) throw err;
            res.status(200).json({ message: 'updated', record: docs })
        })
}

const deleteEmployee = (req, res) => {
    Employee.deleteOne({ _id: req.params.id }, (err, docs) => {
        if (err) throw err;
        res.status(200).json({ message: 'Suceessfully deleted', record: docs })
    })
}

const queryList = async (req, res) => {
    let results = await Employee.find(
        {},

        // { name: 'test2', deparment: 'seo' },

        // { $or: [{ 'account.age': { $gt: 20 } }, { 'email': 'test1@gmail.com' }] },
        // { $and: [{ 'account.age': { $gt: 20 } }, { 'email': 'test1@gmail.com' }] },
        //{ email: { $regex: /^test/ } },
        { name: 1, email: 1, 'account.age': 1, _id: 0, department: 1 }
    ).sort({ name: 1 })
        //.limit(2);
        //.count()
        // .count({ 'account.test': { $exists: true } })
        .distinct('department')
    res.status(200).json({ message: 'list', record: results })
}

const queryMethodStatic = async (req, res) => {
    let response = 'Static & Method';
    let emp = new Employee();
    let data = { id: 1, name: 'test' };
    // emp.getDepartment(data, function (err, docs) {
    //     res.status(200).json({ message: 'department', record: docs })
    // })
    Employee.getEmail(data, function (err, docs) {
        res.status(200).json({ message: 'department', record: docs })
    })

}

module.exports = {
    addEmployee,
    listEmployee,
    infoEmployee,
    updateEmployee,
    deleteEmployee,
    queryList,
    queryMethodStatic
}
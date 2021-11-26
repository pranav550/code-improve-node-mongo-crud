const mongoose = require("mongoose");
mongoose.connect(process.env.database1)
    .then(conn => {
        console.log("mongodb connnected")
    })
    .catch(err => {
        console.log("Error:" + err.message)
    })


mongoose.admin = mongoose.createConnection(process.env.database2);
mongoose.CodeImprove = mongoose.createConnection(process.env.database1);
module.exports = mongoose;
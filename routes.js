const express = require("express");
const router = express.Router();
const empCtrl = require("./controller/employee");
const bodyParser = require("body-parser");

const urlencoderParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json());

router.post('/add', urlencoderParser, empCtrl.addEmployee);
router.get('/list', empCtrl.listEmployee);
router.get('/info/:id', empCtrl.infoEmployee);
router.put('/update/:id', urlencoderParser, empCtrl.updateEmployee);
router.delete('/delete/:id', empCtrl.deleteEmployee);
router.get('/query', empCtrl.queryList);
router.get('/method-static', empCtrl.queryMethodStatic);

module.exports = router;
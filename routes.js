const express = require('express');
const router = express.Router();
const user = require('./user');

// EMPLOYEE INFOS
router.get('/allemployees',user.employeedata);
router.get('/employee/:id',user.employeedatabyid);
router.get('/department/:department',user.department);
router.get('/salaryA',user.salaryA);
router.get('/salaryB',user.salaryB);
router.get('/salaryC',user.salaryC);
router.put('/editUser/:Id', user.editUser);
router.delete('/deleteUser/:Id', user.deleteUser);
router.post('/addUser', user.addUser);


module.exports = router;
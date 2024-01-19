const connection = require('./db');

// EMPLOYEE TABLE
function employeedata (req,res) {
    const fetchdataquery = `SELECT * FROM employeeinfo`;

    connection.query(fetchdataquery, (fetcherror,fetchdataresult) => {
        if(fetcherror){
            return res.status(401).json({message:'Error fetching data',fetcherror});
        }
        return res.status(200).json({fetchdataresult});
    })
}

function employeedatabyid (req,res) {
    const id = req.params.id;
    const fetchinfoquery = `SELECT * FROM employeeinfo where ID=?`;

    const parsedId = parseInt(id, 10);
    if (!Number.isInteger(parsedId) || parsedId < 1 || parsedId > 30) {
        return res.status(400).json({ message: 'Invalid ID. Please provide a valid integer between 1 and 30.' });
    }

    connection.query(fetchinfoquery,[id], (fetcherror,fetchresult) => {
        if(fetcherror){
            return res.status(401).json({message:'Error fetching data',fetcherror});
        }
        return res.status(200).json({fetchresult});
    })
}

function department (req,res) {
    const department = req.params.department
    const fetchdepquery = `SELECT * FROM employeeinfo where Department=?`;

    if (department !== 'Software' && department !== 'Hardware') {
        return res.status(400).json({ message: 'Invalid department. Please provide either Software or Hardware.' });
    }

    connection.query(fetchdepquery,[department], (fetchdeperror,fetchdepresult) => {
        if(fetchdeperror){
            return res.status(401).json({message:'Error fetching data',fetchdeperror});
        }
        return res.status(200).json({fetchdepresult});
    })
}

function salaryA (req,res) {
    const fetchsalquery = `SELECT * FROM employeeinfo WHERE Salary BETWEEN 10000 AND 15000 ORDER BY Salary;`;

    connection.query(fetchsalquery, (fetchsalerror,fetchsalresult) => {
        if(fetchsalerror){
            return res.status(401).json({message:'Error fetching data',fetchsalerror});
        }
        return res.status(200).json({fetchsalresult});
    })
}

function salaryB (req,res) {
    const fetchsalquery = `SELECT * FROM employeeinfo WHERE Salary BETWEEN 15000 AND 25000 ORDER BY Salary;`;

    connection.query(fetchsalquery, (fetchsalerror,fetchsalresult) => {
        if(fetchsalerror){
            return res.status(401).json({message:'Error fetching data',fetchsalerror});
        }
        return res.status(200).json({fetchsalresult});
    })
}

function salaryC (req,res) {
    const fetchsalquery = `SELECT * FROM employeeinfo WHERE Salary BETWEEN 25000 AND 30000 ORDER BY Salary;`;

    connection.query(fetchsalquery, (fetchsalerror,fetchsalresult) => {
        if(fetchsalerror){
            return res.status(401).json({message:'Error fetching data',fetchsalerror});
        }
        return res.status(200).json({fetchsalresult});
    })
}


module.exports = {
    employeedata,
    employeedatabyid,
    department,
    salaryA,
    salaryB,
    salaryC
};
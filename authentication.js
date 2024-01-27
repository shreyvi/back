const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER USER
function register (req,res) {                                                                                                                    
    const { UserID, FirstName, LastName, Company, Company_mailID, Personal_mailID, Password, Time } = req.body;
    const checkPersonalmail_query = `SELECT * FROM test_user_data WHERE Personal_mailID = ?`;
    const insert_query = `INSERT INTO test_user_data(UserID,FirstName,LastName,Company,Company_mailID,Personal_mailID,Password,Time)
    VALUES(?,?,?,?,?,?,?,NOW())`   
    try {
        
        connection.query(checkPersonalmail_query,[Personal_mailID], (checkmailError, checkmailResult) => {
            if(checkmailError){
                return res.status(401).json({message:'Error while checking personal mail ID',error:checkmailError});
            }
            
            if(checkmailResult.length>0){
                return res.status(401).json({message: 'Personal mailID already in use!'});
            }
      
        bcrypt.hash(Password, 10, (hashError, hashPassword) => {    

            if (!Password) {
                return res.status(400).json({ message: 'Invalid password data' });
            }
                                                                                        
            if (hashError){
                console.error(hashError);
                return res.status(400).json({message:'Error while hashing password', error:hashError});
            }

            connection.query(insert_query, [UserID, FirstName, LastName, Company, Company_mailID, Personal_mailID, hashPassword, Time], (insertUserError , insertUser) => {
                if(insertUserError){
                    return res.status(402).json({message:'Error while inserting data',insertUserError});
                }
              
                return res.status(200).json({message:'User registered!'});
            });
        });
    }); 
    }
    catch (error){
        return res.status(500).send('Internal Server Error');
    }
}  

// LOGIN
function login(req,res){
    const {Personal_mailID,Password} = req.body;
    const checkPersonalmail_query = `SELECT * FROM test_user_data WHERE Personal_mailID = ?`;
    try{
        connection.query(checkPersonalmail_query,[Personal_mailID], (checkmailError, checkmailResult) => {
                if(checkmailError){
                    return res.status(401).json({message:'Error while checking personal mail ID',error:checkmailError});
                }

                // if entered wrong mailid, checkmailResult will be NULL,thus ===0 in below line
                if(checkmailResult.length===0){
                    return res.status(401).json({message: 'Entered personal mailID is wrong'});
                }  
                user = checkmailResult[0];

            bcrypt.compare(Password, user.Password, (passwordError,passwordResult) => {
                if (passwordError){
                    return res.status(401).json({message:'Error during password comparison'});
                }
                if (!passwordResult){
                    return res.status(401).json({message:'Invalid Credentials'});
                }

                const jwToken = jwt.sign({Personal_mailID:user.Personal_mailID},process.env.JWT_SECRET);
                return res.status(200).json({message:'Login Successful!',token:jwToken});
            })
        })
    }
    catch(error){
        return res.status(500).send('Internal Server Error');
    }
}



module.exports = {
    register,
    login
}
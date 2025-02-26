const db = require("../configs/db");

//READ operation to use /getall to get users list
const getUsers = async(req,res) => {
    try{
        const data = await db.query("SELECT * FROM user")
        if(!data)
        {
            return res.status(404).send({
                message: "No records found",
                success: false,
                error,
            });
        }
        res.status(200).send({
            success: true, 
            message: "all the records fetched",
            totalUsers: data[0].length,
            data: data[0],
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({error: "Error in getting users data API"})
    }
};

//Read operation by Get BY ID
const getUserbyID = async(req, res) => {
    try{
     const userId = req.params.id;
     if(!userId){
        return res.status(404).send({
            message: false, 
            message: "Invalid user Id provided",
            error
        });
     }

    // const db = await db.query(`select * from user where id=`+userId)
    const data = await db.query(`SELECT * FROM user WHERE id=?`, [userId,]);
    if (!data){
        return res.status(404).send({
            success: false,
            message:"no records found",
            data,});}     
    res.status(200).send({
        success: true, 
        UserDetails: data[0],});
}
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting user data",
            error,
        })
    }
};

//create Operation
const createUser = async(req,res) =>{
    try{
        const {id,username, age,emailid} = req.body;

        if(!id|| !username || !age || !emailid){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields", 
            })
        }
     
        const data = await db.query(`INSERT INTO user (id, username, age, emailid) VALUES (?,?,?,?)`,
            [id, username, age,emailid]);
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Error in INSERT query"
            })
        }
        res.status(201).send({
            success: true,
            message:"new record is added",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false, 
            message: "Internal server error occured",
            error
        })
    }
};


//Update operation

const userUpdate = async(req, res) =>{
    try{
        const{username, age, emailid} = req.body;
        const userId = req.params.id;
        if(!userId){
            return res.status(404).send({
                success: false,
                message:"User Id is not found",
                error
            })
        }
        const data = await db.query(
            `UPDATE user SET username = ?, age = ? , emailid = ?, WHERE id = ? `, [username, age,emailid],);
        if(!data){
            res.status(500).send({
                success:false,
                message: "Error in UPDATE query",
            })
        }
        res.status(200).send({
            success: true,
            message: "User details are updated",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating user API",
            error
        })
    }
}

//DELETE operation
const userDelete = async(req, res) =>{
    try{
        const userId = req.params.id;
        if(!userId){
            return res.status(404).send({
                success: false,
                message:"user id is not found",
                error
            })
        }

     await db.query(`DELETE FROM user WHERE id =? `,[userId],)
     res.status(200).send({
        success: true,
        message:"Record is deleted",
     })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Delete query API is failed to load",
            error
        })
    }

}
//export module
module.exports={ getUsers,getUserbyID,createUser,userUpdate,userDelete };
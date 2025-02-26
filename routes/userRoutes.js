const express = require("express");
const { getUsers, getUserbyID, createUser, userUpdate, userDelete } = require("../controllers/userController");

//router
const router = express.Router();

// ROUTES samples 

//get details for all uses
router.get('/getall', getUsers);

//gets users by ID
router.get('/get/:id', getUserbyID);


//create users || POST
router.post('/create', createUser)

//update users || PUT
router.put('/update/:id', userUpdate);

//DELETE
router.delete('/delete/:id', userDelete);

//export modules
module.exports = router;
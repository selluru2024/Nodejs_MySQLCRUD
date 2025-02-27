//declare the packages
const mysql= require('mysql2/promise');
const dotenv = require('dotenv');

//configure dotenv
dotenv.config();

//data base pool connection using dotenv package to secure the credentials

const mysqlpool=mysql.createPool({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password:`${process.env.PASSWORD}`,
    database: `${process.env.DB_URL}`
})

module.exports=mysqlpool;
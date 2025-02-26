//declare the packages
const express = require('express')
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const mysqlpool = require('./configs/db');

//configure dotenv
dotenv.config();

//middlwares
app.use(morgan("dev"));
app.use(express.json()); // this is used in order to accept the json data

//Port is referenced 8000 incase it's get crashed with 8080
const PORT = process.env.PORT || 8000;

//routes

app.use('/api/v1/users',require("./routes/userRoutes.js"));
app.get('/test', (req, res) => {
  res.status(200).send('<h1> Nodejs SQL App</h1>');
})

//conditionally listening mysql
mysqlpool.query('SELECT 1').then(() =>{
    //mysql connectity
    console.log('My SQL DB is connected');

    //listen main port
app.listen(PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
    //console.log(`server running on 8000`);
  
  });
}).catch((error) =>{
    console.log(error);
});
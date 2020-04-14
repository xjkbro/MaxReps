const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')
require('dotenv').config();

//Initialize server 
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());        //Body Parser
app.use(express.urlencoded({extended:false}));

//Database Connection
mongoose
    .connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.log(err));

//Router initializations
const userRouter = require('./routes/User');
//Routes
app.use('/user', userRouter)


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});
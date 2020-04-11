const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config();

//Router initializations
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');



//Initialize server 
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
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

//Routes
app.use('/', indexRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);








app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
})

app.post('/api/login', (req,  res) => {
    
    const user = {
        id: 1,
        username: 'jkbro'
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '30m'}, (err, token) => {
        res.json({
            token
        });
    });
})

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>
//Verify Token
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ')
        //Get the token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next Middleware
        next();
    } else {
        res.sendStatus(403)
    }

}


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});
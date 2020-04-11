const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

require('dotenv').config();

//User Model
const User = require('../../models/User')



module.exports = router;
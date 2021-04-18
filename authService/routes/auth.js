const config = require('config'); 
const _ = require('lodash');
const {User, validate, login}=require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res)=>{
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({$or:[{email:req.body.email}, {username:req.body.username}]});
 	if(user) return res.status(400).send('User already registered.');

	user = new User (_.pick(req.body,['username','email','password']));
 	const salt = await bcrypt.genSalt(10);
 	user.password = await bcrypt.hash(user.password,salt);
    
    await user.save();

    //returns a user objects with just username and email properties
    res.send( _.pick(user, ['id','username','email']));
});

//logging in with username and password
router.post('/login',async (req,res)=>{ 
	const {error} = login(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({username:req.body.username});
 	if(!user) return res.status(400).send('Invalid Email or password.');

 	const validPassword = await bcrypt.compare(req.body.password, user.password);
 	if (!validPassword) return res.status(400).send('Invalid Email or password.');

 	const token = user.generateAuthToken();
 	res.send(token);

});

//testing the user if authenticated. 
//This endpoint should be called in the beginning of all other services
router.get('/isAuthenticated',async (req,res)=>{ 
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try{
		const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
		req.user = decoded;
		res.send(decoded);
	}
	catch (err) {
		res.status(400).send('Invalid token.');
	}
});

module.exports = router; 
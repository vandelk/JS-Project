const User = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

module.exports.register = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
            .json({msg: 'successfully created user', user: user})
        })
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null) {
                res.json({msg: 'invalid login attempt'});
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordValid => {
                        if(passwordValid){
                            res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                            .json({msg: 'success'});
                        }
                        else {
                            res.json({msg: 'invalid login attempt'})
                        }
                    })
                    .catch(err => res.json({msg: 'invalid login attempt'}))
            }
        })
        .catch(err => res.json(err))
}

module.exports.getLoggedIn = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    User.findById(decodedJWT.payload._id)
        .then(user => res.json({user}))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    res.cookie("usertoken", jwt.sign({_id:""}, secret), {httpOnly:true, maxAge: 0})
    .json({msg: "ok"})
}
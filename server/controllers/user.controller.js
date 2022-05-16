const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');

module.exports = {
    register: ((req,res)=> {
        const user = new User(req.body);

        user.save()
            .then((newuser => {
                console.log("new User")
                console.log("Successfully registered")
                res.json({
                    successMessage:"Thank you for registering",
                    user:newuser
                })
            }))
            .catch((err) => {
                console.log("registring not successfull!",err)
                res.status(400).json(err)
            })
    }),

    login:((req,res) => {
        User.findOne({email:req.body.email})
            .then((userRecord => {
                if(userRecord === null){
                    //email is not found
                    res.status(400).json({message:"invalid login attempt",error:"this is from the null"})
                } 
                else {
                    // email is found
                    bcrypt.compare(req.body.password,userRecord.password) // this will return a bool t/f
                        .then((isPasswordValid)  => {
                            if(isPasswordValid) {
                                console.log("Password is valid")
                                res.cookie("usertoken",
                                    jwt.sign(
                                        //pay load is data we want to save
                                    {
                                        id: userRecord._id,
                                        email: userRecord.email,
                                        username: userRecord.username
                                    },
                                    process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now() + 9000000)
                                    },
    
                                ).json({
                                    message:"Succesfully loged in",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                })

                            }
                            else {
                                res.status(400).json({
                                    message:"Login and/or email invalid",
                                })
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({message:"invalid attempt"},err)
                        })
                }
            }))
            .catch((err) => {
                console.log(err)
                res.status(400).json({message:"invalid attempt"},err)
                
            })
    }),

    logout:(res,req) => {
        console.log("logging out");
        res.clearCookie("usertoken")
        res.json({
            message:"You have successfully logged out!"
        })
    },

    getOneUser: ((req,res) => {
        User.findOne({_id:req.params.id})
            .then((oneUser) => {
                console.log(oneUser)
                res.json(oneUser)
            })
            .catch((err)=> {
                console.log(err)
                res.status(400).json(err)
            })
    }),

    getLoggedInUser: (req,res) => {
        User.findOne({_id:req.jwtpayload.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    findAllUsers: (req,res) => {
        User.find()
            .then((allUsers) => {
                console.log(allUsers)
                res.json(allUsers)
            })
            .catch((err) =>{
                console.log(err)
                res.json({message:"something went wront with retreving all users",error:err})
            })
    }


}
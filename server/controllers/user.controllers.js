const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


module.exports  = {
    register:  (async (req,res) => {
        try{
            const user = new User(req.body)
            const saveUser = await user.save();
            console.log(saveUser);
            console.log("Successfull Registred!")
            res.json({successMessage:"Thank you for registring ",
                        user:saveUser})
    }
    catch(err){
        console.log({message:'Something went wrong with creating a User',error:err})
        return res.status(400).json(err)
    }
    }),
    loginUser:  (async (req,res) => {
        try{
            const findUser = await User.findOne({email: req.body.email})
            if(findUser === null){
                console.log('invalid login attempt')
                res.status(400).json({message:"invalid login attempt"})
            }else {
                bcrypt.compare(req.body.password,findUser.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid){
                            console.log("password is valid")
                            res.cookie('usertoken',
                                jwt.sign({
                                    id: findUser._id,
                                    email:findUser.email,
                                    username:findUser.username
                                },process.env.JWT_SECRET),
                                {
                                    httpOnly:true,
                                    expires: new Date(Date.now()+ 9000000)
                                }
                            ).json({
                                message:"Succesfully",
                                userLoggedIn: findUser.username,
                                userId: findUser._id
                            })
                        }
                        else {
                            console.log('invalid login attempt, username or password')
                            res.status(400).json({message:"invalid Attempt"})
                        }
                    })
            }
            
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'Something went wrong with login process',error:err})
    }
    }),

    logout:(async(req,res) => {
        console.log("loging out")
        res.clearCookie("usertoken")
        res.json({
            message: "You have successfully logged out "
        })
    }),

    getLoggedInUser: (async(req,res) =>{
        try{
            // const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
            const findUser = await User.findOne({_id:req.jwtpayload.id})
            console.log(findUser)
            res.json(findUser)
        }
        catch(err){
            console.log(err)
            res.status(404).json({message:'some weird error'})
        }

    })




}
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
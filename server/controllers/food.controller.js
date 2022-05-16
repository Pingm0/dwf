const Food = require('../models/food.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


module.exports  = {
    findAllFood:  (async (req,res) => {
        try{
        const findFood = await Food.find({}).populate('createdBy',"username email")
        console.log(findFood)
        return res.json(findFood)
    }
    catch(err){
        console.log(err)
        return res.json({message:'Something went wrong with finding all food',error:err})
    }
    }),
    findExpiredFood: (async(req,res) => {
        try{
            // const findFood = await Food.find({'expirationDate': {$lt:Date.now()},createdBy:ObjectId(req.body.id)})
            // const findFood = await Food.find({createdBy: ObjectId('626db47b019f0342b1efb705')})
            const findOneUser = await User.findOne({username:req.params.username})
            const findAllXPFood = await Food.find({'expirationDate': {$lt:Date.now()},createdBy:findOneUser._id}).populate('createdBy', 'username')
            console.log(findAllXPFood)
            return res.json(findAllXPFood)
        }
        catch(err){
            console.log(err)
            return res.json({message:'Something went wrong with finding all food',error:err})
        }
    }),

    createFood:(async (req,res) => {
        console.log("created food")
        try{
            const newFoodObj = new Food(req.body)
            console.log(req.body)
            const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
            console.log(decodedJWT)
            newFoodObj.createdBy = decodedJWT.payload.id
            console.log(newFoodObj)

            const saveFood = await newFoodObj.save()
            console.log('food Added',saveFood)
            return res.json(saveFood)
        }
        catch(err){
            res.status(400).json(err)
        }
    }),

    getOneFood: (async (req,res) => {
        try{
            const oneFood = await Food.findOne({_id:req.params.id})
            console.log(oneFood)
            return res.json(oneFood)
        }
        catch(err){
            console.log(err)
            res.json(err)
        }
    }),

    updateFood: (async(req,res) => {
        try{

            if(req.jwtpayload.username !== req.params.username){
                console.log("Not the User")
                console.log(req.jwtpayload.username,"this is in if for jwt")
                console.log(req.params.username,"this is in if for params")
            }else{
                const findAndUpdate = await Food.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
                console.log('recored updated ')
                return res.json(findAndUpdate)
            }
    
        }catch(err) {
            console.log(err)
            res.json(err)
        }

    }),
    deleteFood: (async (req,res) => {
        try{
            
            const deleteOne = await Food.deleteOne({_id:req.params.id})
                console.log("deleted")
                return res.json(deleteOne)

        }catch(err){
            console.log("Deleted")
            return res.json(err)
        }
    } ),

    findAllFoodByUser: (async (req,res) => {
        try{if(req.jwtpayload.username !== req.params.username){
            console.log("Not the User")
            console.log(req.jwtpayload.username,"this is in if for jwt")
            console.log(req.params.username,"this is in if for params")
            console.log(findAllFood)
        }
        else {
            console.log("current User")
            console.log("req.jwtpayload.id",req.jwtpayload.id)
            console.log(req.jwtpayload.username)
            console.log(req.params.username)
            const allFood = await Food.find({createdBy:req.jwtpayload.id}).populate('createdBy','username')
            console.log(allFood)
            res.json(allFood)
        }
    }
    catch (err){
        console.log('something went wrong',err)
        res.status(400).json(err)
    }
    })
}
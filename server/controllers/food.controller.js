const Food = require('../models/food.modle')

module.exports = {
    findAllFood:((req,res) => {
        Food.find()
            .then((allFood) => {
                console.log(allFood)
                res.json(allFood)
            })
            .catch((err) => {
                console.log("Somthing went wrong with retreving all food",err)
                res.json({message:"Someting went wrong with Find all food",error:err})
            })
    }),
    createItem:((req,res) => {
        Food.create(req.body)
            .then((newFood) => {
                console.log(newFood)
                res.json(newFood)
            })
            .catch((err) => {
                console.log('Something went wrong with adding a new food Item',err)
                res.status(400).json(err)
            })
    }),
    getOneFood: ((req,res) => {
        Food.findOne({_id: req.params.id})
        .then((OneFood) => {
            console.log(OneFood)
            res.json(OneFood)
        })
        .catch((err) => { console.log(err)})
    }),
    updateFood:((req,res) => {
        Food.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
            .then((updateOneFood) => {
                console.log(updateOneFood)
                res.json(updateOneFood)
            })
            .catch((err) => {
                console.log('something went wrong with update',err)
                res.status(400).json(err)
            })
    }),

    deletePet:((req,res) => {
        Food.deleteOne({_id:req.params.id})
            .then((deleteOneFood) => {
                console.log("Delete Food")
                res.json(deleteOneFood)
            })
            .catch((err => {
                console.log("Something went wrong when deleting a Food")
                res.json(err)
            }))
            
    })
}
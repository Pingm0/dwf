const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    foodType: {
        type: String,
        required:[true,'Please Select food type from the drop down'],
        enum:['vegetables','fruits','grains','meat','poultry','fish','dairy'],
        
    },  
    foodName: {
        type: String,
        required:[true,'Please Provide food name'],
    },
    purchaseDate: {
        type:Date,
        required:[true,'Please Add purchase Date'],
        get: value => value.toDateString()
    },
    expirationDate: {
        required:[true,'Please Add Expiration Date'],
        type:Date
    },
    qty: {
        required:[true,'Please Add Quintity'],
        type:Number
    }
},{timestamps:true});

module.exports = mongoose.model('Food',FoodSchema)
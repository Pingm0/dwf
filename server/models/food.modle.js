const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
    itemName: { 
        type: String,
        require:[true, "Please Enter an Item Name"] 
    },
    foodType: { 
        type: String,
        required:[true,"please choose Food type"]
    },
    qty:{
        type: Number,
        required:[true,"Please Enter quantity"]
    },
    purchaseDate: {
        type:Date
    },
    expirationDate: {
        type:Date
    }
}, { timestamps: true });
module.exports = mongoose.model('Food', FoodSchema);


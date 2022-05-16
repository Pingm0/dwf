const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required:[true,"Username is requierd"],
        unique:true
    },
    name: {
        type: String,
        required:[true,"Name is requierd"]
    },
    email: {
        type: String,
        required: [true,"Email address is required"],
        unique:true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required:[true,"Password is required"],
        minLength: [8,"Passwords MUST be at least 8 Characters"]
    }
},{timestamps:true})

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });
    
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
    });
    UserSchema.plugin(uniqueValidator,{message: 'This Field need to be unique'});
    module.exports = mongoose.model('User',UserSchema)
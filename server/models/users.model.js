const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [8, "Password must be 8 characters"]
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(function(){
        return this._confirmPassword
    })
    .set(function(value){
        this._confirmPassword = value})

UserSchema.pre("validate", function(next){
    if(this.password != this._confirmPassword){
        this.invalidate("confirmPassword","Passwords must match");
    }
    next();
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("Hashing Password error: ",err);
            next();
        })

})

const User = mongoose.model('User', UserSchema);

module.exports = User;

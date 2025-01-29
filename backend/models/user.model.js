const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid",
        ]
    },
    username: {
        type: String,
        required: [true, 'Username is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        max:100,
        minlength: 6
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        max: 50
    },
    surname: {
        type: String,
        required: [true, "Last name is required"],
        max: 50
    },
    idNumber: {
        type: String,
        required: [true, 'ID or Passport number is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role: {
        type: String,
        required: [true, 'Role is a required field'],
        enum: ["admin", "user"]
    }
},
{
    collection: 'users',
    timestamps: true
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)
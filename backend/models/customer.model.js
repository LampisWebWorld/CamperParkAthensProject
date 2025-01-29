const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema;

let rvSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        lowercase: true
    },
    model: {
        type: String
    },
    year: {
        type: String
    },
    liscencePlate: {
        type: String,
        trim: true,
        lowercase: true
    },
    length: {
        type: String
    }
});

let customerSchema = new Schema({
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
    rv: {type: [rvSchema], null: true}
},
{
    collection: 'customers',
    timestamps: true
})


customerSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Customer',customerSchema)
const Customer = require('../models/customer.model')

exports.findAll = async(req, res) => {
    console.log("Find all users");

    try {
        const result = await Customer.find()
        res.json({ status: true, data: result })
    } catch(err){
        res.json({ status:false, data: err })
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find user with email ", username);

    try {
        const result = await Customer.findOne({email: username});
        res.json({status:true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.create = async(req, res) => {
    const newCustomer = new Customer ({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        idNumber: req.body.idNumber,
        phone: req.body.phone,
        rv: {
            brand: req.body.rv.brand,
            model: req.body.rv.model,
            year: req.body.rv.year,
            liscencePlate: req.body.rv.liscencePlate,
            length: req.body.rv.length
        }
    });

    console.log("Insert customer with name", req.body.name);
    console.log(req.body)

    try {
        const result = await newCustomer.save();
        res.json({ status:true, data: result});
    } catch (err) {
        res.json({status: false, data: err})
    }
}

exports.update = async(req, res) => {
    const username = req.params.username;
    console.log(req.params.username);
    console.log("Update user with email ", username, req.body);

    const updateCustomer = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        idNumber: req.body.idNumber,
        phone: req.body.phone,
        rv: {
            brand: req.body.rv.brand,
            model: req.body.rv.model,
            year: req.body.rv.year,
            liscencePlate: req.body.rv.liscencePlate,
            length: req.body.rv.length
        }
    };

    try {
        const result = await Customer.findOneAndUpdate(
            {email: username},
            updateCustomer,
            { new: true }
        )
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status: false, data: err})
    }
}

exports.delete = async(req, res) =>{
    const username = req.params.username;

    console.log("Delete user with email", username);

    try {
        const result = await Customer.findOneAndDelete({email: username})
        res.json({ status: true, data: result});
    } catch (err) {
        res.json({ status: false, data: result});
    }
}
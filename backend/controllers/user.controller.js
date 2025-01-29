const User = require('../models/user.model')

exports.findAll = async(req, res) => {
    console.log("Find all users");

    try {
        const result = await User.find()
        res.json({ status: true, data: result })
    } catch(err){
        res.json({ status:false, data: err })
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find user with username ", username);

    try {
        const result = await User.findOne({username: username});
        res.json({status:true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.update = async(req, res) => {
    const username = req.params.username;
    console.log(req.params.username)
    // const rv = req.body.rv
    console.log("Update user with username ", username, req.body);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        idNumber: req.body.idNumber,
        phone: req.body.phone,
    };

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            { new: true }
        )
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status: false, data: err})
    }
}

exports.delete = async(req, res) =>{
    const username = req.params.username;

    console.log("Delete user with username", username);

    try {
        const result = await User.findOneAndDelete({username: username})
        res.json({ status: true, data: result});
    } catch (err) {
        res.json({ status: false, data: result});
    }
}
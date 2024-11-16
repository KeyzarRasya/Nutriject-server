const User = require('../model/User')
const bcrypt = require('bcrypt')

const signup = async(req, res) => {
    let {name, email, password} = req.body;

    const findUser = await User.findOne({email});

    if(findUser){
        return res.send({status:400, message:"Email already exist"})
    }

    password = await bcrypt.hash(password, 12);
    const newUser = new User({name, email, password});

    await newUser.save()
    res.send({status:200, message:"Success Create User", user:newUser})
}

const login = async(req, res) => {
    const {email, password} = req.body;

    const findUser = await User.findOne({email})

    if(!findUser){
        return res.send({status:400, message:"Wrong email"});
    }

    let isValid = await bcrypt.compare(password, findUser.password)

    if(!isValid){
        return res.send({status:400, message:"wrong password"})
    }

    res.send({status:200, message:"Success Login", user:findUser})
}

module.exports = {
    signup,
    login
}
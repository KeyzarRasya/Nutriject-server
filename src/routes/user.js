const express = require('express')
const User = require('../model/User')
const {signup, login, makan, setPersonalInfo, getTodayReport} = require('../controller/user')

const router = express.Router()

router.post("/signup", signup)
router.post('/login', login)
router.post("/makan", makan);
router.post('/update', setPersonalInfo)
router.get("/all", async(req, res) => {
    const username = "Key";
    const user = await User.find({name:username});
    res.send({user});
})
router.get("/report", getTodayReport)

module.exports = router
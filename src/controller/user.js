const User = require('../model/User')
const Report = require('../model/report');
const bcrypt = require('bcrypt')
const moment = require('moment')

const signup = async(req, res) => {
    let {email, name, password} = req.body;

    const findUser = await User.findOne({email});

    if(findUser){
        return res.send({status:400, message:"Email already exist"})
    }

    password = await bcrypt.hash(password, 12);
    const newUser = new User({email, password, name});

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

const setPersonalInfo = async(req, res) => {
    const { age, 
        gender, 
        height, 
        weight, 
        activity,
        BMR,
        TDEE,
        carbsMax,
        carbsMin,
        fatMax,
        fatMin,
        proteinMax,
        proteinMin,
        saltMax,
        saltMin,
        sugarMax,
        sugarMin,
        waterRequirement,
        userId } = req.body;
    const findUser = await User.findById(userId);
    if(!findUser){
        return res.status(404).send({message:"User not found"});
    }
    findUser.age = age;
    findUser.gender = gender;
    findUser.height = height;
    findUser.weight = weight;
    findUser.activity = activity;
    findUser.BMR = BMR;
    findUser.TDEE = TDEE;
    findUser.carbsMax = carbsMax;
    findUser.carbsMin = carbsMin;
    findUser.fatMax = fatMax;
    findUser.fatMin = fatMin;
    findUser.proteinMax = proteinMax;
    findUser.proteinMin = proteinMin;
    findUser.saltMax = saltMax;
    findUser.saltMin = saltMin;
    findUser.sugarMax = sugarMax;
    findUser.sugarMin = sugarMin;
    findUser.waterRequirement = waterRequirement;

    await findUser.save();
    res.send({status:200, message:"Success Saving User Info", user:findUser});
}

const makan = async(req, res) => {
    const {carbs, protein, salt, sugar, fat, BMR, userId} = req.body;
    const reports = await Report.find({ userId });

    if (reports.length === 0) {
      const newReport = new Report({ userId, kalori:BMR,carbs, protein, salt, sugar, fat, tanggal: moment(new Date()).format("DD-MM-YYYY") });
      await newReport.save();   
      return res.send({ message: 'No previous reports found, created a new one', newReport });
    }
  
    let todayReport = null;
    const currentDate = moment(new Date()).format("DD-MM-YYYY");

    reports.forEach((report) => {
        const reportDate = report.tanggal
        const today = currentDate;
        console.log("Report Date : "+ reportDate);
        console.log("Today : " + today)
        if (reportDate === today) {
            todayReport = report;
        }
    });
    if (todayReport === null) {
        const newReport = new Report({ userId, kalori:BMR, carbs, protein, salt, sugar, fat, tanggal: moment(new Date()).format("DD-MM-YYYY") });
        await newReport.save();   
        return res.send({ message: 'Today is the new day, created new report', newReport });
    }
    console.log(moment(new Date()).format("DD-MM-YYYY"))
    console.log(todayReport);
    const current = await Report.findById(todayReport._id);

    current.carbs += carbs;
    current.fat += fat;
    current.protein += protein;
    current.sugar += sugar;
    current.salt += salt;
    current.kalori += BMR;

    await current.save();

    res.send({report:current})
}


const getTodayReport = async(req, res) => {
    const {userId} = req.query;
    let today = moment(new Date()).format("DD-MM-YYYY");
    console.log(userId)
    const reports = await Report.findOne({userId:userId, tanggal:today});
    if(!reports){
        return res.send({message:"Report not found"});
    }
    const user = await User.findById(userId);

    const combined = { ...reports._doc, user: { ...user._doc } };

    res.status(200).send({combined});

}

module.exports = {
    signup,
    login,
    setPersonalInfo,
    makan,
    getTodayReport
}
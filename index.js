require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const {config} = require('./src/config/envirovment')
const userRouter = require('./src/routes/user')
const cors = require('cors')

const app = express();

const {DATABASE, PORT, URI} = config(process.env)

mongoose.connect(process.env.MONGODB_LOCAL)
.then(res => console.log('CONNECTED TO DATABASE'))
.catch(err => console.log(err))

app.use(cors({
  origin: 'https://nutriject.vercel.app',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('this work')
})

app.listen(3001, () => {
    console.log("Connected to Server")
})
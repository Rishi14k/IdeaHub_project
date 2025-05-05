require('./cronJobs');  // This will import the cron job and start it when the server starts
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const authRoute = require('./routes/authRoute')
const ideaRoute = require('./routes/ideaRoute')
const commentRoute = require('./routes/commentRoute')
// const collabRoute = require('./routes/collabRoute')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_KEY)
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Error in DB",err)
})

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))


app.use('/api/auth',authRoute)
app.use('/api/idea',ideaRoute)
app.use('/api/comment',commentRoute)
// app.use('/api/collab',collabRoute)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})

require('dotenv').config()
const express = require("express");
const customerrouter = require('./routes/customers')
const accountrouter = require('./routes/accounts')
const mongoose = require('mongoose')
const app = express() 

app.use(express.json()) 
app.use((req,res,next) => { 
    console.log(req.path, req.method)
    next()  
})

app.use('/bank',customerrouter)
app.use('/account',accountrouter)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT,()=>{
            console.log("listening on",process.env.PORT);
        });        
    })
    .catch((error)=>{
        console.log(error)
    })





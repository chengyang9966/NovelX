require('dotenv').config({ 
  silent:process.env.NODE_ENV ==='Production'
  ,path:__dirname+ '/.env' });
const express=require('express');
const cors = require('cors');
const formData = require("express-form-data");
const app=express();
const db=require('./db').connection;
const Query=require('./db').query;
const auth=require('./utils/jwtToken').Auth;
const {Route}=require('./routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(formData.union());
app.use(Route()); 
db();
// db().then(
//   Query(`SELECT * FROM users`).then(res=>{
//     console.log('res: ', res);
  
//   })
// );


app.post("/api/auth",auth,(req,res)=>{
  res.status(201).json({
    message:'user Authorize'
  })
});

app.listen(process.env.PORT||4500,()=>console.log(`App listen at ${4500}`))

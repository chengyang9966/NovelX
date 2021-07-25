const express=require('express');
const dotenv = require('dotenv');
// const livereload = require("livereload");
const path = require("path");
// const connectLivereload = require("connect-livereload");
const cors = require('cors');
const UserSchema=require('./schema/UserSchema')
const app=express();
const db=require('./db').connection;
const Query=require('./db').query;
const CloseNetwork=require('./db').CloseNetwork;
const CreateTable=require('./db').CreateTable;
const UserModel=require('./models/User')
const home=require('./routes/home');
const dashboard=require('./routes/dashboard');
const login=require('./routes/login');
const checkStatus=require('./utils/checkStatus');
const register = require('./routes/register');
const GetRoles=require('./routes/roles').GetRoles;
const auth=require('./utils/jwtToken').Auth;
const SignToken=require('./utils/jwtToken').SignToken;
if(process.env.NODE_ENV !=='Production'){
    
    require('dotenv').config();
}
let gracefulShutdown;
// For nodemon restarts
gracefulShutdown = function (msg, callback) {
  CloseNetwork(msg)
  callback();
};
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});

// liveReloadServer.watch(path.join(__dirname, 'views'));
// liveReloadServer.server.once("connection", () => {
//     console.log(`live Reload Server is Ready`)
//     setTimeout(() => {
//       liveReloadServer.refresh("/");
//     }, 100);
//   });
// app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// app.use(express.static(path.join(__dirname + '/views')));
// app.use(connectLivereload());
// set route Item
db().then(
  Query(`SELECT * FROM users`).then(res=>{
    console.log('res: ', res);
  
  })
);

// CreateTable(`CREATE TABLE IF NOT EXISTS roles (
//   id serial PRIMARY KEY,
//   name character varying(255) NOT NULL UNIQUE,
//   created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
//   updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
// );`)
const text =  [{
  email: 'test@example.com',
  fname: 'Fred',
  lname:'Lee',
  password:'12312331231312312321dadf1w2r1fd1f31fwf12f223fv23efve'
}, {
  email: 'test2@example.com',
  fname: 'Lynda',
  lname:'Lee',
  password:'12312331231312312321dadf1w2r1fd1f31fwf12f223fv23efve'
}];
const values =UserModel.insert(text).returning(UserModel).toQuery();


// Login
app.get('/',auth,checkStatus);
// Login Control
  app.get("/login",home);
  app.post('/api/login',login);
//   Register
  app.get("/register",register.registerPage);
  app.post('/register',register.register);
  app.post('/api/registerUser',register.registerUser);
//   Authorize 
app.get("/dashboard",auth,dashboard);
// Roles
app.get("/api/getRoles",GetRoles);
process.once('SIGUSR2', function () {
  console.log('heeghef')
  process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});
app.listen(process.env.PORT||4500,()=>console.log(`App listen at ${4500}`))

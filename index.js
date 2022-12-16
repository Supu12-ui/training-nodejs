const User=require('./models/user');
const {auth} =require('./middlewares/auth');
const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const bodyParser = require('body-parser');
const db = require('./Country/database');
const app = express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});
const User=require('./../models/user');

let auth =(req,res,next)=>{
    let token =req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            error :true
        });

        req.token= token;
        req.user=user;
        next();

    })
}

module.exports={auth};

// adding new user (sign-up route)
app.post('/api/register',function(req,res){
    // taking a user
    const newuser=new User(req.body);
    
   if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
 
        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                succes:true,
                user : doc
            });
        });
    });
 });
 const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");
const connection = require("./db");
//.....

app.use(express.json());

app.use("/api/users", users);
app.use("/api/password-reset", passwordReset);
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db1 = require('./database');
 
var db2 = express();
 
// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
app.get('/countries-list', function(req, res) {
    db.query('SELECT * FROM countries ORDER BY id desc', function(err, rows) {
 
        if (err) {
            res.json({
                msg: 'error'
            });
        } else {
            res.json({
                msg: 'success',
                countries: rows
            });
        }
    });
});
 
app.post('/get-states-by-country', function(req, res) {
 
 
    db.query('SELECT * FROM states WHERE country_id = "' + req.body.country_id + '"',
        function(err, rows, fields) {
 
            if (err) {
                res.json({
                    msg: 'error'
                });
            } else {
                res.json({
                    msg: 'success',
                    states: rows
                });
            }
 
        });
});
 
app.post('/get-cities-by-state', function(req, res) {
 
 
    db.query('SELECT * FROM cities WHERE state_id = "' + req.body.state_id + '"',
        function(err, rows, fields) {
 
            if (err) {
                res.json({
                    msg: 'error'
                });
            } else {
                res.json({
                    msg: 'success',
                    cities: rows
                });
            }
 
        });
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function() {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;


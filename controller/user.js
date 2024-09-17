const express = require("express");
const app = express();
const register = require("../models/user")
const bcrypt = require('bcrypt');
const basicAuth = require('express-basic-auth');


const renderSignup = (req, res) => {
  res.render('signup');
};

// Render Login page
const renderLogin = (req, res) => {
  res.render('login');
};

const renderdashboard = (req, res) => {
  res.render('dashboard');
};


const signup = async(req, res) => {
  const { name, email, password, username } = req.body;
  const data = {
    name,
    email,
    password,
    username
  };

if(!username || !email || !password || !name){
  return res.json({
    msg:"fill all fields"
  });
}

   var flags = "gm";
  const pattern = "[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"
  const regexPattern = new RegExp(pattern, flags);
  var error = []

  if (email) {
    if(!email.match(regexPattern)){
      error.push(
        {
          errorField : "email",
          msg : "invalid email"
        }
      )
    }
  }

  
  const passwordflags = "gm";
  const passwordpattern =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  // const pswregexPattern = new RegExp(passwordpattern, passwordflags);
  
  if (password) {
    if(!passwordpattern.test(password)){
      error.push(
        {
          errorField : "password",
          msg : " invalid password"
        }
      )
    }
  }
  
  const userpattern="^(?!.*__)(?!.*_$)[a-zA-Z0-9_]{3,16}$"
  const usernameregexpattern=new RegExp(userpattern,flags);
  
  if(username){
    if(!username.match(usernameregexpattern)){
      error.push(
        {
          errorField:"username",
          msg:"not valid username"
        }
      )
    }
  }



  if (error.length > 0) {
    return res.json({
      error : true,
      errorData : error
    })
  }

  const hash = await bcrypt.hash(password, 10);
  data["password"]=hash;
  console.log(data,hash)

  const newUser = new register(data);
  newUser.save().then(user => {
    console.log('User saved:', user);
    res.json(user)
  }).
    catch(error => { res.json(error) });
};

const login = async (req, res) => {
  const {email ,password}=req.body
  console.log(email,password)
  var error = [];
  if (!email || !password) {
    return res.json({ message: 'Username and password are required' });
  }
  const user = await register.findOne({ email });

  if (!user) {
    error.push({
      errorField: "email",
      msg: "Invalid email",
    });
  }

  if (user && password) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      error.push({
        errorField: "password",
        msg: "Invalid password",
      });
    }
  }

  if (error.length > 0) {
    return res.json({
      error: true,
      errorData: error
    });
  }

  return res.json({
    user,
    message: "Login successful",
  });
};

  

const dashboard = (req, res) => {
  res.send('Accessed protected route!');
};

module.exports = { renderSignup, signup, login, renderLogin, dashboard, renderdashboard }
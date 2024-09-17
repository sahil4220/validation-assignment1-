const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

// Use CORS middleware
app.use(cors());

const es6render=require("express-es6-template-engine")
const user=require("./routes/user")

app.engine('html',es6render);
app.set('views','views');
app.set('view engine','html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://0.0.0.0:27017/gfg')
  .then(() => console.log("Connection succeeded"))
  .catch(err => console.error("Connection error", err))

  app.use("/user",user)

app.get("/",(req,res)=>{
  res.redirect('/user/login');
})

app.listen(4000, () => {
  console.log("Server listening at port 4000");
});

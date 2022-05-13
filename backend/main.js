const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies

const userRoute= require("./master/user");

app.use("/user", userRoute);


mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log("Db Conneted");
});
 
app.listen(3002, () => {
    console.log("server is running");
  }); 

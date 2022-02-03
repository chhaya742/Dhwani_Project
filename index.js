require("dotenv")
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.json());

var multer = require('multer');
var upload = multer();
app.use(upload.array()); 


const router = require("./routes/router");
app.use(bodyparser.urlencoded({extended: true}));
require("dotenv").config();



app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`);
});

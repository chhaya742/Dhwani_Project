require("dotenv")
const knex = require("../Databases/db");
const jwt=require("jsonwebtoken")
const {sign}=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

saltRounds=10;


//get users
users = (req, res) => {
  knex
    .select("*")
    .from("UserAccount")
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};


//insert data
createUsers = (req, res) => {
  if ( !req.body.name|| !req.body.email ||  !req.body.password){
    res.send({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
      })
      console.log({
        "success": false,
        "status": 400,
        "message": "Got error while saving",
        });
      return""
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const userdata = {
    Name: req.body.name,
    email: req.body.email,
    password:bcrypt.hashSync(req.body.password,salt)

  };
  knex("UserAccount")
    .insert(userdata)
    .then((data) => {
      res.send({ success: `${ req.body.email} registered successfully!` });
    })
    .catch((err) => {
      if (res.errorno=1062){
      res.send({message:"this email already exist"})}
      else{
      console.log(err);
      res.send({ message: err });}
    });
  }





// login
UserLogin=(req,res)=>{
  if (!req.body.email||!req.body.password){
    res.send({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
      })
      console.log({
        "success": false,
        "status": 400,
        "message": "Got error while saving",
        });
      return""
  }
knex.from('UserAccount').select("*").where("email","=",req.body.email,"password","=",req.body.password)
  .then((data) => {
    if (data.length==0){
      console.log("user account not exist");
      res.json({message:"this user account not exist"})

    }
    else{
    if(bcrypt.compareSync(req.body.password,data[0].password)){
    const token=sign({id:data[0].id},process.env.SECRET_KEY,{ expiresIn:"6h"})
    res.cookie("user",token)
        res.json({"success": true,
        "status": 200,
        "message": "Login successfull.",
        "token": token,
      })
      console.log({message:data});
    }
    else{
      res.json({message:"incorrect password"})
    }
  }
  })
  .catch((err) => { 
    res.json({message:err })
    console.log({message:err });
    })
}




// logoutusr

logoutUser=(req,res)=>{
  res.clearCookie("user")
  res.json({message:"logout success"})


}


module.exports = { users, createUsers,UserLogin,logoutUser};

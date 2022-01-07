const knex = require("../Databases/db");
require("dotenv")


// get state list
states= (req, res) => {
  knex
    .select("*")
    .from("State")
    .then((data) => {
      console.log(data);
      res.json({ 
        "success": true,
        "status": 200,
        "message": "State Detail",
        "state": [data]});
    })
    .catch((err) => {
        console.log(err);
        res.send({ message: err });
    });
};


// post state 


post_state=(req, res) => {
    if ( !req.body.State_name ){
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
  const userdata = {
    State_name:req.body.State_name
  };
  // console.log(req.body.State_name);
  knex("State")
    .insert(userdata)
    .then((data) => {
      res.send({ success: `${req.body.State_name} registered successfully!` });
    })
    .catch((err) => {
      if(res.errorno=1062){
        res.send({message:"this State already exist"})}
    
      else{
      console.log(err);
      res.send({ message: err });
    }
    });
};




module.exports = {states,post_state};

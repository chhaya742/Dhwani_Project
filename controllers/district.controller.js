const knex = require("../Databases/db");

// get state list
district = (req, res) => {
  console.log(req.query);
  knex
    .select("*")
    .from("District")
    .where("State_id",parseInt(req.query.state_id))
    .then((data) => {
      console.log(data);
      res.json({
        "success": true,
        "status": 200,
        "message": "District Detail",
        "district": [data]});
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err });
    });
};

// post state

create_district = (req, res) => {
  if (!req.body.District_name || !req.body.State_id) {
    res.send({
      success: false,
      status: 400,
      message: "Got error while saving",
    });
    console.log({
      success: false,
      status: 400,
      message: "Got error while saving",
    });
    return "";
  }
  const userdata = {
    District_name: req.body.District_name,
    State_id: req.body.State_id,
  };
  knex("District")
    .insert(userdata)
    .then((data) => {
      res.send({ success: `${req.body.District_name} registered successfully!` });
    })
    .catch((err) => {
      if (res.errorno=1062){
        res.send({message:"this district already exist"})}
      
      else{
        console.log(err);
        res.send({ message: err });}
    });
};

module.exports = { district, create_district };

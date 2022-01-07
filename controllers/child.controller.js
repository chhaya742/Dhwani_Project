const knex = require("../Databases/db");
require("dotenv")


// get state list
getChildeProfile = (req, res) => {
  id = res.id;
  console.log(id);
  knex
    .select("*")
    .from("Childs")
    .then((data) => {
      //   console.log(data);
      res.json({
        success: true,
        status: 200,
        message: "Child Profile Detail",
        child_profile: [data],
      });
    })

    .catch((err) => {
      console.log(err);
      res.json({ message: err });
      res.json({
        name: "Not Found",
        message: "Page not found.",
        code: 0,
        status: 404,
      });
    });
};

// post state

createChildeProfile = (req, res) => {
  if (
    !req.body.name ||
    !req.body.sex ||
    !req.body.dob ||
    !req.body.father_name ||
    !req.body.mother_name ||
    !req.body.District_id
  ) {
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
    name: req.body.name,
    sex: req.body.sex,
    dob: req.body.dob,
    father_name: req.body.father_name,
    mother_name: req.body.mother_name,
    District_id: req.body.District_id,
  };
  knex("Childs")
    .insert(userdata)
    .then((data) => {
      res.send({
        success: true,
        status: 200,
        message: "Operation performed successfully",
      });
    })
    .catch((err) => {
      console.log({ message: err });
      res.send({ message: err });
    });
};

module.exports = { getChildeProfile, createChildeProfile };

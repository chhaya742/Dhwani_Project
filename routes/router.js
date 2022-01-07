const express = require("express");
const router = express.Router();
require("dotenv")

const {users, createUsers ,UserLogin,logoutUser} = require("../controllers/user.controller");
const {states,post_state} = require("../controllers/state.controller");
const {district,create_district} = require("../controllers/district.controller");
const {createChildeProfile,getChildeProfile} = require("../controllers/child.controller");




router.get("/api/Users", users);
router.post("/api/Register",createUsers);
router.post("/api/Login", UserLogin);
router.get("/api/logout",logoutUser);


router.get("/api/getstates", states);
router.post("/api/poststate", post_state);

router.get("/api/districtlist", district);
router.post("/api/postdistrict", create_district);


router.get("/api/getChildeProfile", getChildeProfile);
router.post("/api/createChildeProfile", createChildeProfile);
router.get("*",(req,res)=>{
  res.json(
  {
    "name": "Not Found",
    "message": "Page not found.",
    "code": 0,
    "status": 404,
    "name": "Invalid Route",
    
})
})
router.post("*",(req,res)=>{
  res.json(
  {
    "name": "Not Found",
    "message": "Page not found.",
    "code": 0,
    "status": 404,
    "name": "Invalid Route",
    
})
})







module.exports = router;

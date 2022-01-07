require("dotenv")
const knex = require("knex")({
  client: "mysql",
  connection: {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
  },
  useNullAsDefault: true,
});


knex.schema
  .createTable("UserAccount", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").notNullable().unique();
    table.string("password").notNullable().unique();
  })
  .then((data) => {
    console.log("UserAccount Table Created");
  })
  .catch((err) => {
    console.log("Useraccount Table Already Exist!!");
  });


knex.schema
  .createTable("State", (table) => {
    table.increments("id").primary();
    table.string("State_name").notNullable().unique();
  })
  .then((data) => {
    console.log("State Table Created");
  })
  .catch((err) => {
    console.log("State Table Already Exist!!");
  });


  knex.schema
  .createTable("District", (table) => {
    table.increments("id").primary();
    table.string("District_name").notNullable().unique();
    table.integer("State_id")
    
  })
  .then((data) => {
    console.log("District Table Created");
  })
  .catch((err) => {
    console.log("District Table Already Exist!!");
  });

  

knex.schema
.createTable("Childs", (table) => {
  table.increments("id").primary();
  table.string("name").notNullable().unique();
  table.string("sex").notNullable().unique();
  table.string("dob").notNullable().unique();
  table.string("father_name").notNullable().unique();
  table.string("mother_name").notNullable().unique();
  table.integer("District_id").notNullable().unique();
  
 
})
.then((data) => {
  console.log("Childs Table Created");
})
.catch((err) => {
  console.log("Childs Table Already Exist!!");
});


  

module.exports = knex;

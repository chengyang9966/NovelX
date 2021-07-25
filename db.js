// const mongoose = require("mongoose");
const {  Client } = require("pg");

 async function connection() {
  try {
    const client = new Client({
      host: process.env.HEROKU_POSTGRESQL_HOST,
      user: process.env.HEROKU_POSTGRESQL_USER,
      password:process.env.HEROKU_POSTGRESQL_PASSWORD,
      port: process.env.HEROKU_POSTGRESQL_PORT,
      database: process.env.HEROKU_POSTGRESQL_DATABASE,
      ssl: { rejectUnauthorized: false },
    });
  
    client.connect((err) => {
      if (err) {
        console.log("err: ", err);
        console.log("Could not Connect to Database");
      } else {
        console.log("Connected to Database");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("Could not Connect to Database");
  }


}
;
async function query(query, params) {
  const client = new Client({
    host: process.env.HEROKU_POSTGRESQL_HOST,
    user: process.env.HEROKU_POSTGRESQL_USER,
    password:process.env.HEROKU_POSTGRESQL_PASSWORD,
    port: process.env.HEROKU_POSTGRESQL_PORT,
    database: process.env.HEROKU_POSTGRESQL_DATABASE,
    ssl: { rejectUnauthorized: false },
  });
 await client.connect();

  const { rows} = await client.query(query, params);
  if(rows){
    return rows
  }else{
    return ('error in query')
  }
  
}
module.exports ={
  connection,
  query,
  CreateTable,
  CloseNetwork
}
async function CreateTable(text,param) {
  const client = new Client({
    host: process.env.HEROKU_POSTGRESQL_HOST,
    user: process.env.HEROKU_POSTGRESQL_USER,
    password:process.env.HEROKU_POSTGRESQL_PASSWORD,
    port: process.env.HEROKU_POSTGRESQL_PORT,
    database: process.env.HEROKU_POSTGRESQL_DATABASE,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  client.query(text,param,(err, res) => {
    if (err) throw err
    console.log('Create Table Successfully ')
    client.end(err => {
      console.log('client has disconnected')
      if (err) {
        console.log('error during disconnection', err.stack)
      }
    })
  });

}
async function CloseNetwork(data){
  const client = new Client({
    host: process.env.HEROKU_POSTGRESQL_HOST,
    user: process.env.HEROKU_POSTGRESQL_USER,
    password:process.env.HEROKU_POSTGRESQL_PASSWORD,
    port: process.env.HEROKU_POSTGRESQL_PORT,
    database: process.env.HEROKU_POSTGRESQL_DATABASE,
    ssl: { rejectUnauthorized: false },
  });
  client.end(err => {
    console.log('client has disconnected')
    console.log(data)
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
}
function Inserts(template, data) {
  if (!(this instanceof Inserts)) {
      return new Inserts(template, data);
  }
  this._rawDBType = true;
  this.formatDBType = function () {
      return data.map(d=>'(' + pgp.as.format(template, d) + ')').join(',');
  };
}
// const config = require("./config");
// const Sequelize = require('sequelize');
// const { listen_addresses } = require("./config");
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   config.listen_addresses,
//   {
//     host: config.HOST,
//     dialect: 'postgresql',
//     operatorsAliases: false,
//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
// );
// sequelize.authenticate()
// .then(() => {
// console.log('Connection has been established successfully.');
// })
// .catch(err => {
// console.error('Unable to connect to the database:', err);
// })
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.user = require("./models/User")(sequelize, Sequelize);
// db.role = require("./models/Role")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];

// module.exports = db;
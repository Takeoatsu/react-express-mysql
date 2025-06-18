const dbConfig = require("../config/db.config.js"); // Import db config

const Sequelize = require("sequelize"); // Import Sequelize library
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { // Create a new Sequelize instance
  host: dbConfig.HOST, // Database host (e.g., localhost, remote server)
  dialect: dbConfig.dialect, // Database dialect (e.g., mysql, postgres, sqlite, etc.)
  dialectOptions: dbConfig.dialectOptions, // Additional options for the dialect, such as SSL settings
  port: dbConfig.port, // Database port (default is usually 3306 for MySQL)
  operatorsAliases: false, // Disable the use of string operators to prevent deprecation warnings

  pool: { // Connection pool settings
    max: dbConfig.pool.max, // Maximum number of connections in the pool
    min: dbConfig.pool.min,   // Minimum number of connections in the pool
    acquire: dbConfig.pool.acquire, // Maximum time (in ms) to acquire a connection before throwing an error
    idle: dbConfig.pool.idle // Maximum time (in ms) that a connection can be idle before being released
  }
});

const db = {}; // Initialize an empty object to hold the database models and Sequelize instance

db.Sequelize = Sequelize; // Assign the Sequelize constructor to db.Sequelize for later use
db.sequelize = sequelize; // Assign the Sequelize instance to db.sequelize for later use

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize); // Import the tutorial model and pass the Sequelize instance and constructor

module.exports = db; // Export the db object containing the Sequelize instance and models for use in other parts of the application

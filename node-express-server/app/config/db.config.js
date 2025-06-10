module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
// This configuration file sets up the database connection parameters for a Node.js application using Sequelize ORM.
// It exports an object containing the database host, user, password, database name, dialect, and connection pool settings.
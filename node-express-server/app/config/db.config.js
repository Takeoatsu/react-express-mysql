module.exports = {
  HOST: process.env.DB_HOST || "react-express-db1.mysql.database.azure.com", // Default to Azure MySQL database host, replace with your actual host
  USER: process.env.DB_USER || "expressadmin", // Default to Azure MySQL database user, replace with your actual user
  PASSWORD: process.env.DB_PASSWORD || "2508Moni!", // Default to Azure MySQL database password, replace with your actual password
  DB: process.env.DB_NAME || "react-express-db1", // Default to Azure MySQL database name, replace with your actual database name
  port: process.env.DB_PORT || 3306, // Default to MySQL port, replace with your actual port if different
  dialect: "mysql", // Default to MySQL dialect, change if using a different database
  dialectOptions: {
    ssl: { // Enable SSL encryption
      require: false, // Set to true if your database requires SSL
      rejectUnauthorized: false // This is important for self-signed certificates
    }
  },
  pool: { // Connection pool settings
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in ms) to acquire a connection before throwing an error
    idle: 10000 // Maximum time (in ms) that a connection can be idle before being released  
  }
};
// This configuration file sets up the database connection parameters for a Node.js application using Sequelize ORM.
// It exports an object containing the database host, user, password, database name, dialect, and connection pool settings.
const express = require("express"); // Import the express module
const cors = require("cors"); // Import the cors module
const app = express(); // Initialize CORS options


var corsOptions = { // Define CORS options
  origin: "http://20.48.173.221", // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type','Authorization'], // Specify allowed headers
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions)); // Apply CORS middleware to the entire app

app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes

// parse requests of content-type - application/json
app.use(express.json()); // Enable JSON parsing for incoming requests

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded data parsing for incoming requests

const db = require("./app/models"); // Import the database models

db.sequelize.sync() // Sync the database models with the database
  .then(() => { // This will create the tables if they do not exist 
    console.log("Synced db."); // Log a message indicating that the database has been synced
  })
  .catch((err) => { // Handle any errors that occur during the sync process
    console.log("Failed to sync db: " + err.message); // Log an error message if the sync fails
  });


// simple route

app.get("/api/users", (req, res) => { // Define a route to get a list of users
  // This is a placeholder response. Replace with actual user data retrieval logic.
    res.json([ // Respond with a JSON array of user objects
      { id: 1, name: "Alice" }, // Example user object
      { id: 2, name: "Bob" } // Another example user object
    ]);
  });

  app.get("/", (req, res) => { // Define a simple route for the root URL
    res.json({ message: "Welcome to the React Express application." }); // Respond with a JSON object
  });
// routes
  
require("./app/routes/turorial.routes")(app); // Import and register the tutorial routes

// set port, listen for requests
const PORT = process.env.PORT || 8080; // Set the port to listen on, defaulting to 8080 if not specified in the environment variables
app.listen(PORT, '0.0.0.0', () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}.`); // Log a message indicating that the server is running

});
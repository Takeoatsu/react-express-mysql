const express = require("express");
const cors = require("cors");

const app = express(); // Initialize CORS options

var corsOptions = {
  origin: "https://reactstaticwebapp.z9.web.core.windows.net/", // Adjust this to your frontend's URL
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route

app.get("/api/users", (req, res) => {
    res.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]);
  });
  
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}.`);

});
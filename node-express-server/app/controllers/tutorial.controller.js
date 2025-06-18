const db = require("../models"); // Importing the database model 
const Tutorial = db.tutorials; // Importing the tutorials model from the database
const Op = db.Sequelize.Op;  // Importing Sequelize operators for query conditions

// Create and Save a new Tutorial
exports.create = (req, res) => { // Exporting the create function to be used in the routes file
  console.log("incoming POST body: ", req.body); // Log the incoming POST request body for debugging
  // Validate request
  if (!req.body.title) { // Check if the title is provided in the request body
    res.status(400).send({ // If not, send a 400 Bad Request response
      message: "Content can not be empty!" // with a message indicating that the content cannot be empty
    });
    return; // Exit the function early if title is not provided
  }

  // Create a Tutorial
  const tutorial = { // Create a new tutorial object with the provided data
    title: req.body.title, // Set the title of the tutorial
    description: req.body.description, // Set the description of the tutorial 
    published: req.body.published ? req.body.published : false // Set the published status, defaulting to false if not provided
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)   // Use the create method from the Tutorial model to save the new tutorial
    .then(data => {res.status(201).res.send(data); // Send a 201 Created response with the created tutorial data
    })
    .catch(err => { // Handle any errors that occur during the creation process
      console.error("Error creating tutorial:", err); // Log the error for debugging
      // Log the error to the console for debugging
      console.log("Error details:", err.message); // Log the error message for debugging
      // Send a 500 Internal Server Error response
      res.status(500).send({ // Send a 500 Internal Server Error response
        message: 
          err.message || "Some error occurred while creating the Tutorial." // with a message indicating that an error occurred
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => { // Exporting the findAll function to be used in the routes file
  const title = req.query.title; // Get the title from the query parameters
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null; // Create a condition for the query based on the title

  Tutorial.findAll({ where: condition }) // Use the findAll method from the Tutorial model to retrieve all tutorials
    .then(data => { // Handle the successful retrieval of tutorials
      res.send(data); // Send the retrieved tutorials as the response
    })
    .catch(err => { // Handle any errors that occur during the retrieval process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message:
          err.message || "Some error occurred while retrieving tutorials." // with a message indicating that an error occurred
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => { // Exporting the findOne function to be used in the routes file
  const id = req.params.id; // Get the id from the request parameters

  Tutorial.findByPk(id) // Use the findByPk method from the Tutorial model to find a tutorial by its primary key (id)
    .then(data => { // Handle the successful retrieval of the tutorial
      if (data) { // Check if the tutorial was found
        res.send(data); // Send the found tutorial as the response
      } else { // If the tutorial was not found
        res.status(404).send({ // Send a 404 Not Found response
          message: `Cannot find Tutorial with id=${id}.` // with a message indicating that the tutorial was not found
        });
      }
    })
    .catch(err => { // Handle any errors that occur during the retrieval process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message: "Error retrieving Tutorial with id=" + id // with a message indicating that an error occurred
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => { // Exporting the update function to be used in the routes file
  const id = req.params.id; // Get the id from the request parameters

  Tutorial.update(req.body, { // Use the update method from the Tutorial model to update the tutorial
    where: { id: id } // Specify the condition for the update based on the id
  })
    .then(num => { // Handle the successful update of the tutorial
      if (num == 1) { // Check if the update was successful
        res.send({ // If successful, send a success message
          message: "Tutorial was updated successfully." // with a message indicating that the tutorial was updated
        });
      } else {
        res.send({  // If the update was not successful
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!` // send a message indicating that the tutorial was not found or the request body is empty
        });
      }
    })
    .catch(err => {   // Handle any errors that occur during the update process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message: "Error updating Tutorial with id=" + id // with a message indicating that an error occurred
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => { // Exporting the delete function to be used in the routes file
  const id = req.params.id; // Get the id from the request parameters

  Tutorial.destroy({ // Use the destroy method from the Tutorial model to delete the tutorial
    where: { id: id } // Specify the condition for the deletion based on the id
  })
    .then(num => { // Handle the successful deletion of the tutorial
      if (num == 1) { // Check if the deletion was successful
        res.send({ // If successful, send a success message
          message: "Tutorial was deleted successfully!" // with a message indicating that the tutorial was deleted
        });
      } else {
        res.send({ // If the deletion was not successful
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!` // send a message indicating that the tutorial was not found
        });
      }
    })
    .catch(err => { // Handle any errors that occur during the deletion process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message: "Could not delete Tutorial with id=" + id // with a message indicating that an error occurred
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => { // Exporting the deleteAll function to be used in the routes file
  Tutorial.destroy({ // Use the destroy method from the Tutorial model to delete all tutorials
    where: {}, 
    truncate: false // Set truncate to false to delete all records without resetting the auto-incrementing primary key
  })
    .then(nums => { // Handle the successful deletion of all tutorials
      res.send({ message: `${nums} Tutorials were deleted successfully!` }); // Send a success message with the number of deleted tutorials
    })
    .catch(err => { // Handle any errors that occur during the deletion process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message: 
          err.message || "Some error occurred while removing all tutorials." // with a message indicating that an error occurred
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => { // Exporting the findAllPublished function to be used in the routes file
  Tutorial.findAll({ where: { published: true } })  // Use the findAll method from the Tutorial model to retrieve all published tutorials
    .then(data => { // Handle the successful retrieval of published tutorials
      res.send(data); // Send the retrieved published tutorials as the response
    })
    .catch(err => { // Handle any errors that occur during the retrieval process
      res.status(500).send({ // Send a 500 Internal Server Error response
        message:
          err.message || "Some error occurred while retrieving tutorials." // with a message indicating that an error occurred
      });
    });
};

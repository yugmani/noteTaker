// Dependencies
var fs = require("fs");
var express = require("express");
var path = require("path");
const notes = require("./db/db.json")

// Sets up the Express App

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const viewPath = path.join(__dirname, './views');
app.use(express.static(viewPath));

// =============================================================

// Routes
// =============================================================


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/notes.html"));
});


// Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  //displays single note
app.get("/api/notes/:id", function(req, res) {
  var select = req.params.id;

  console.log(select);

  for (var i = 0; i < notes.length; i++) {
    if (select === notes[i].id) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});


// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
 

// Create New note - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newNote
  
  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

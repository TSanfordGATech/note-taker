// Create dependencies
const express = require("express");
const path = require ("path");
const fs = require ("fs");
const util = require("util");

// Make the read file
const readFileAsync = util.promisify(fs.readFile);
// Write file
const writeFileAsync = util.promisify(fs.writeFile);

// Create the server
const app=express();
// set the port 
const PORT = process.env.PORT || 8000;
// Set use
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Make the static files. This bit was pulled from https://expressjs.com/en/starter/static-files.html
app.use(express.static("./develop/public"));

// Start bringing in the APIs. There will be a Get, Post, and delete. 

// GET request
app.get("/api/notes", function(req, res) {
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// POST 
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
})
.then(function(notes) {
    writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
    res.json(note);
})
});


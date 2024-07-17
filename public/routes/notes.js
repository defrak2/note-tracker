const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../../helpers/fsUtils");

//GET route for retrieving all the notes
notes.get("/", (req, res) => {
  path.join(__dirname, "./db/db.json")
  .then((data) => res.json(JSON.parse(data)))
  .catch((err) => {
    console.error(err);
  res.status(500).json('Error reading from file');
  })
});

//POST route for submitting new notes

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if ((title && text)) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    path.join(newNote, __dirname, "./db/db.json");
    const respose = {
      status: 'success', 
      body: newNote,
    }
    .then(() => res.json(newNote))
    .catch((err) => {
      console.error(err);
      res.status(500).json('Error writing to file');
    });
  } else {
    res.status(400).json("Error in posting note");
  }
});

module.exports = notes;

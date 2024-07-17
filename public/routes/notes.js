const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../../helpers/fsUtils");
const path = require("path");

//GET route for retrieving all the notes
notes.get("/", async (req, res) => {
  const data = await readFromFile(path.join(__dirname, "../../db/db.json"))
    res.json(JSON.parse(data))
   
});

//POST route for submitting new notes

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readFromFile(path.join(__dirname, "../../db/db.json"))
      .then((data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        return writeToFile(path.join(__dirname, "../../db/db.json"), notes);
      })
      .then(() => res.json(newNote))
      .catch((err) => {
        console.error(err);
        res.status(500).json("Error reading from file");
      });
  } else {
    res.status(400).json("Invalid input, title and text are required.");
  }
});

notes.delete("/:id", (req, res) => {
  readFromFile(path.join(__dirname, "../../db/db.json"))
    .then((data) => {
      const notes = JSON.parse(data);
      const findNote = notes.filter((findEl) => findEl.id !== req.params.id);
      return writeToFile(path.join(__dirname, "../../db/db.json"), findNote);
    })
    .then(() => res.json(newNote))
    .catch((err) => {
      console.error(err);
      res.status(500).json("Error writing to file");
    });
});
module.exports = notes;

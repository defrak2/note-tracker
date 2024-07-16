const express = require('express');
const path = require('path');


const PORT = process.env.port || 3001;

const app = express();

//Middleware for parsing JSON and urlencoded form data:

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));


//GET route for homepage:

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '../index.html'))
);

//GET route for notes page:

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '../notes.html')))

//GET route for error 404 page:

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '../404.html')))

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`))
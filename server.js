const express = require('express');
const path = require('path');
const apiRouter = require('./public/routes/index.js');



const app = express();

const PORT = process.env.port || 3001;
//Middleware for parsing JSON and urlencoded form data:

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', apiRouter)



//GET route for homepage:

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET route for notes page:

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, './public/pages/notes.html')))

//GET route for error 404 page:

app.get('*', (req, res) => 
  res.status(404).sendFile(path.join(__dirname, './public/pages/404.html')))

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`))
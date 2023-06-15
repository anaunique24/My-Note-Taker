const express = require('express');
const path = require('path');

// Helper function for ID's
const uuid = require('./helpers/uuid');
// Helper function for reading and writing files
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Setting home file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Setting route to notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Retrieving data from db file
app.get('/api/db', (req, res) => {
    console.info(`${req.method} request received for db file`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST routes to add saved notes
app.post('/api/db', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error in adding note');
    }
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
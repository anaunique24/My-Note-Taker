const express = require('express');
const path = require('path');
const fs = require('fs')
const notes = require('./db/db.json');
// const bodyParser = require('body-parser');
const { readAndAppend } = require('./helpers/fsUtils');


// Helper function for ID's
const uuid = require('./helpers/uuid');

const app = express();

const PORT = process.env.PORT || 3001;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Setting home file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Setting route to notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Retrieving data from db file
app.get('/api/notes', (req, res) => {
  res.json(notes);
});  

// POST routes to add saved notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
      // readAndAppend(newNote, './db/db.json', res);
  
    // const reviewString = JSON.stringify(newNote);
      fs.readFile('./db/db.json', 'utf8', (error, data) => {
        console.log(JSON.parse(data));
        let notes = JSON.parse(data);
        notes.push(newNote)
      
      
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        err
        ? console.error(err)
        : console.log(`Review for ${newNote.Title} has been written to JSON file`)
      });
    })
        console.log(req.body);
        res.status(201).json(notes);
      }else {
        res.status(500).json('Error posting note');
      }
      // .getNotes()
      // .then((notes) => {
      //   return res.json(notes);
      // })
      });  
    

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
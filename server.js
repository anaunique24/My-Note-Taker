const express = require('express');
const path = require('path');
const fs = require('fs')
let notes = require('./db/db.json');
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
        id: uuid(),
      };
      // reading data from db.json file
      // fs.readFile('./db/db.json', 'utf8', (error, data) => {
      //   console.log(JSON.parse(data));
        notes.push(newNote)
      
      // writtin now data to the db.json file
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        err
        ? console.error(err)
        : console.log(`Review for ${newNote.Title} has been written to JSON file`)
      });
    // })
        console.log(req.body);
        res.status(201).json(notes);
      }else {
        res.status(500).json('Error posting note');
      }
      });  
    
app.delete('/api/notes/:id', (req, res) => {
  const newArray = [];
    for (let note of notes) {
     if (req.params.id !== note.id){
      newArray.push(note);
     } 
    }
    notes = newArray;
    fs.writeFile('./db/db.json', JSON.stringify(newArray), (err) => {
      err
      ? console.error(err)
      : console.log(`Note with ID ${req.params.id} has been deleted.`)
      res.json("msg deleted");
    });
  })

// calling on the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
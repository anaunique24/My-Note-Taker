const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const bodyParser = require('body-parser');


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
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Retrieving data from db file
app.get('/api/notes', (req, res) => {
  res.json(`${req.method} request recieved for notes`);
});  

// POST routes to add saved notes
app.post('/api/notes', bodyParser.json(), (req, res) => {
    console.info(`${req.method} request received to add a new note`);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
    const reviewString = JSON.stringify(newPost);
      fs.readFile('./db/db.json', 'utf8', (error, data) => {
        console.log(JSON.parse(data));
      })

      fs.writeFile('./db/db.json', reviewString, (err) => {
        err
        ? console.error(err)
        : console.log(`Review for ${newPost.Title} has been written to JSON file`)
      });
      const response = {
          status: 'success',
          body: newPost,
        };

        console.log(req.body);
        res.status(201).json(response);
      }else {
        res.status(500).json('Error posting note');
      }
      });  
      
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
// import modules and packages

// setup express.js server

// define routes
//     GET route for homepage
//         return index.html

//     GET route for notes page
//         return the notes.html

//     GET route to retreive all saved notes
//         read db.json file
//         return all saved notes

//     POST routes to add saved notes
//         read db.json file
//         parse the request body
//         assign a unique ID(uuid)
//         push new note to array of saved notes
//         write the updated array of notes to the db.json file
//         return the new note to the client

//     DELETE route to remove a saved note by unique ID (BONUS)
//         read db.json file
//         get the id of the note to be able to remove
//         find the note with the corresponding ID in the array
//         remove note from array
//         write the new updated array of saved notes w/o the deleted note

// use helper folder for your uuid and utils(fs)


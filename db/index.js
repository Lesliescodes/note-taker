const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');

const readDb = util.promisify(fs.readFile);
const writeDb = util.promisify(fs.writeFile);

class DB {
  read() {
    return readDb('db/db.json', 'utf8');
  }

  write(note) {
    return writeDb('db/db.json', JSON.stringify(note));
  }

 readNotes() {
    return this.read().then((notes) => {
      let allNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }

      return allNotes;
    });
  }

  createNote(note) {
    const { title, text } = note;


    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }


}

module.exports = new DB();

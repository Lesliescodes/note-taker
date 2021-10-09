const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');

const mainPath = path.join(__dirname, './public')
const db = path.join(__dirname, "./db")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static ('public'));
app.use(express.json());
app.get("/". function (req, res){
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.route("/api/notes")
.get(function (req, res) {
res.json(database);
})

.post(function(req, res){
    let jsonFilePth = path.join(__dirname, "/db/db.json");
    let newNote = req.body;
    let highestId = 99;
    for (let i = 0; i < database.length; i++) {
        let individualNote = database{i};

        if (individualNote.id > highestId){
            highestId = individualNote.id;
        }
    }  
    newNote.id = highestid + 1;
    database.push(newNote)
  fs.writeFile(jsonfilepath, JSON.stringify(database), function (err) {

    if (err) {
        return console.log(err);
    }
    console.log("Saved!");
  });
  res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePth = path.join(_dirname, "/db/db.json");
    for (let i = 0; i < database.length; i++){

        if (database[i].id == req.params.id){
            database.splice(i, 1);
            break;
        }
    }
    fs.writerFileSync(jsonFilePth, JSON.stringify(database), function (err){

        if (err) {
            return console.log(err);
        } else {
            console.log("Deleted!");
        }
    });
    res.json(database);
});


app.listen(PORT, () => 
console.log(`successfully connected to http://localhost:${PORT}`)); //https://stackoverflow.com/questions/37929173/significance-of-port-3000-in-express-apps

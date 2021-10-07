const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');

const mainPath = path.join(__dirname, './public')
const db = path.join(__dirname, "./db")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static ('public'));
app.use(express.json());
app.get("/". function (req, res){
    res.sendFile(path.join(__dirname, "/assets/index.html"));
});

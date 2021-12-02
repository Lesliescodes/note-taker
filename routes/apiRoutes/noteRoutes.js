const router = require("express").Router();
const {
    notes
} = require('../../db/db');
const {
    noteCreateNewNote,
    noteDeleteNote
} = require('../../lib/noteFunctions.js');

router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})
router.post('/notes', (req, res) => {
    //req.body holds params that are sent from the client as part of a POST request
    //https://www.google.com/search?q=req.body.id&rlz=1C5CHFA_enUS956US956&sxsrf=AOaemvKGY312QoUwkH4PqOMtWmVDSP7SNA%3A1631569829576&ei=pcc_YYy3IonA0PEPkJyr0AI&oq=req.body.id&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIECAAQHjIGCAAQBRAeMgYIABAFEB4yBAgAEB46BwgAEEcQsANKBAhBGABQ-5IIWPuSCGDpoAhoAXACeACAAXmIAXmSAQMwLjGYAQCgAQKgAQHIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwjMnfig9_zyAhUJIDQIHRDOCioQ4dUDCA4&uact=5
    req.body.id = notes.length.toString();
    let note = noteCreateNewNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    noteDeleteNote(notes, req.params.id);
    res.json(notes);
 })
 module.exports = router;
 module.exports = router;


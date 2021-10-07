let noteTitle;
let noteText;
let saveNotebtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/Develop/notes.html') {
    noteTitle = document.querySelector ('.note-title');
    noteText = document.querySelector ('.note-textarea');
    saveNotebtn = document.querySelector ('.save-note');
    newNoteBtn = document.querySelector ('.new-note');
    noteList = document.querySelector ('.list-container .list-group');
}

const show = elem => {
    elem.style.display = 'inline';
};

const hide = elem =>{
    elem.style.display = 'none';
};

let activeNote = ();

const getNotes = () =>
fetch('/api/notes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});

const saveNote = note =>
fetch('/api/notes', {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
});


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

const deleteNote = id =>
fetch (`/api/notes/${id}`,{
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
});

const renderActiveNote = () => {
    hide(saveNotebtn);

    if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = '';
        noteText.value = '';
    } else {
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
    }
};

const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value,
    };
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

const hanleNoteDelet = e => {
    e.stopPropgation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = ();
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });

};

const handleNoteView = e => {
   e.preventDefault
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNotebtn);
    } else {
        show(saveNotebtn);
    }
};

const rendernotelist = async notes => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach(el => (el.innerHTML = ''));
    }

    let noteListItems = [];

    const creatLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );
            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }
        return liEl;
    };
    if (jsonNotes.lenght === 0){
        noteListItems.push(createLi('No saved Notes', false));
    }
    jsonNotes.forEach(note => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListItems.forEach(note => noteList[0].append(note));
    }
};

const getAndRenderNotes = () => getNotes().then(rendernotelist);

if (window.location.pathname === '/notes') {
    saveNotebtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNoteView);
    noteTitle.addEventListener('click', handleRenderSaveBtn);
    noteText.addEventListener('click', handleRenderSaveBtn);
}

getAndRenderNotes();
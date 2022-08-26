import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
export const noteService = {
    query,
    addNote,
    deleteNote,
    updateNote,
    updateNoteTodo,
    copyNote
}

const STORAGE_KEY = 'notesDB'

function _demoData() {
    const notes = [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                title: '',
                txt: utilService.makeLorem(35)
            },
            style: {
                backgroundColor:
                    "#e6c9a8"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                title: '',
                txt: utilService.makeLorem(50)
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: '',
                txt: utilService.makeLorem(20)
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: '',
                txt: utilService.makeLorem(15)
            },
            style: {
                backgroundColor:
                    "#a7ffeb"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                url: "https://picsum.photos/300/200",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                title: '',
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-video",
            isPinned: false,
            info: {
                url: "https://www.youtube.com/embed/8aGhZQkoFbQ",
                title: "EVENT LOOP"
            },
            style: {
                backgroundColor:
                    "#aecbfa"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: '',
                txt: utilService.makeLorem(70)
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: '',
                txt: utilService.makeLorem(10)
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                url: "https://picsum.photos/300/300",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todo",
            isPinned: false,
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null, id: utilService.makeId() },
                    { txt: "Coding power", doneAt: null, id: utilService.makeId() },
                    { txt: "Grocery", doneAt: null, id: utilService.makeId() },
                    { txt: "Car test", doneAt: null, id: utilService.makeId() },
                    { txt: "Pay bills", doneAt: null, id: utilService.makeId() },
                    { txt: "Draw cash", doneAt: null, id: utilService.makeId() }
                ]
            },
            style: {
                backgroundColor:
                    "#fff"
            }
        }
    ]
    return notes
}

function query() {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    if (!notes) {
        notes = _demoData()
        storageService.saveToStorage(STORAGE_KEY, notes)
    }
    notes.sort(note => note.isPinned ? -1 : 1)
    return Promise.resolve(notes)
}

function addNote(noteTitle, noteTxt, noteType) {
    let newNote
    if (noteType === 'txt') newNote = createNoteTxt(noteTitle, noteTxt)
    else if (noteType === 'img') newNote = createNoteImg(noteTitle, noteTxt, noteType)
    else if (noteType === 'video') newNote = createNoteVideo(noteTitle, noteTxt, noteType)
    else if (noteType === 'todo') newNote = createNoteTodo(noteTitle, noteTxt, noteType)
    // console.log('noteTODO', newNote)
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes.unshift(newNote)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve(newNote)
}

function createNoteTxt(title, txt) {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            title,
            txt
        },
        style: {
            backgroundColor:
                "#fff"
        }
    }
}

function createNoteImg(title, txt, noteType) {
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        isPinned: false,
        info: {
            url: txt,
            title
        },
        style: {
            backgroundColor:
                "#fff"
        }
    }
}

function createNoteVideo(title, txt, noteType) {
    let url = txt
    url = url.replace('watch?v=', 'embed/')
    url = url.substring(0, 41)
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        isPinned: false,
        info: {
            url,
            title
        },
        style: {
            backgroundColor:
                "#fff"
        }
    }
}

function createNoteTodo(label, txt, noteType) {

    let todos = txt.split(',')
    // console.log('before splice', todos)
    // const label = todos.splice(0, 1)
    // console.log('after splice', todos)
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        isPinned: false,
        info: {
            label,
            todos:
                todos.map(todo => { return { txt: todo, doneAt: null, id: utilService.makeId() } })
        },
        style: {
            backgroundColor:
                "#fff"
        }

    }
}

function deleteNote(noteId) {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.filter(note => note.id !== noteId)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve()
}

function updateNote(title, txt, note) {
    let updatedNote
    if (note.type === 'note-txt') updatedNote = updateNoteTxt(title, txt, note)
    else if (note.type === 'note-img') updatedNote = updateNoteImg(title, note)
    else if (note.type === 'note-video') updatedNote = updateNoteVideo(title, note)

    return Promise.resolve(updatedNote)
}

function updateNoteTxt(title, txt, noteToUpdate) {
    noteToUpdate.info.txt = txt
    noteToUpdate.info.title = title
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return noteToUpdate
}

function updateNoteImg(val, noteToUpdate) {
    // console.log(val, noteToUpdate)
    noteToUpdate.info.title = val
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return noteToUpdate
}

function updateNoteVideo(val, noteToUpdate) {
    // console.log(val, noteToUpdate)
    noteToUpdate.info.title = val
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return noteToUpdate
}

function updateNoteTodo(noteToUpdate) {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve(noteToUpdate)
}

function copyNote(note) {
    let copiedNote = JSON.parse(JSON.stringify(note))
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    copiedNote.id = utilService.makeId()
    notes.unshift(copiedNote)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve(copiedNote)
}
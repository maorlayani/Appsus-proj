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
                title: "EVENT LOOP "
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

function addNote(txt, noteType) {
    let newNote
    if (noteType === 'txt') newNote = createNoteTxt(txt)
    else if (noteType === 'img') newNote = createNoteImg(txt, noteType)
    else if (noteType === 'video') newNote = createNoteVideo(txt, noteType)
    else if (noteType === 'todo') newNote = createNoteTodo(txt, noteType)
    console.log('noteTODO', newNote)
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes.unshift(newNote)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve(newNote)
}

function createNoteTxt(txt) {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        info: {
            txt
        }
    }
}

function createNoteImg(txt, noteType) {
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        info: {
            url: txt,
            title: ''
        }
    }
}

function createNoteVideo(txt, noteType) {
    let url = txt
    url = url.replace('watch?v=', 'embed/')
    url = url.substring(0, 41)
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        info: {
            url: url,
        }
    }
}

function createNoteTodo(txt, noteType) {

    let todos = txt.split(',')
    console.log('before splice', todos)
    const label = todos.splice(0, 1)
    console.log('after splice', todos)
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        info: {
            label: label[0],
            todos:
                todos.map(todo => { return { txt: todo, doneAt: null, id: utilService.makeId() } })
        }
    }
}

function deleteNote(noteId) {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.filter(note => note.id !== noteId)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve()
}

function updateNote(val, note) {
    let updatedNote
    if (note.type === 'note-txt') updatedNote = updateNoteTxt(val, note)
    else if (note.type === 'note-img') updatedNote = updateNoteImg(val, note)
    else if (note.type === 'note-video') updatedNote = updateNoteVideo(val, note)

    return Promise.resolve(updatedNote)
}

function updateNoteTxt(val, noteToUpdate) {
    noteToUpdate.info.txt = val
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
    let copiedNote = { ...note }
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    copiedNote.id = utilService.makeId()
    notes.unshift(copiedNote)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve(copiedNote)
}
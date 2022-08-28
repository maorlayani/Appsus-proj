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
            type: "note-video",
            isPinned: false,
            info: {
                url: "https://www.youtube.com/embed/qALEkPoY-Hg",
                title: ""
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
                txt: 'Home WIFI Password: pass123456789'
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
                txt: 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[3] for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.'
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
                txt: `Don't forget to renew your driving license before the end of the month`
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
                url: "https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE",
                title: "Saturday at the beach"
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
                title: 'Wedding anniversary 21/9',
                txt: ''
            },
            style: {
                backgroundColor:
                    "#fdcfe8"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-video",
            isPinned: false,
            info: {
                url: "https://www.youtube.com/embed/8aGhZQkoFbQ",
                title: "Event loop video explanation"
            },
            style: {
                backgroundColor:
                    "#aecbfa"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todo",
            isPinned: true,
            info: {
                label: "TV shows to watch",
                todos: [
                    { txt: "House of the Dragon", doneAt: null, id: utilService.makeId() },
                    { txt: "Ted Lasso", doneAt: null, id: utilService.makeId() },
                    { txt: "Better Call Saul", doneAt: null, id: utilService.makeId() },
                ]
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
                txt: 'JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.'
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
                url: "https://i.picsum.photos/id/1020/4288/2848.jpg?hmac=Jo3ofatg0fee3HGOliAIIkcg4KGXC8UOTO1dm5qIIPc",
                title: "Don't mess with mama bear"
            },
            style: {
                backgroundColor:
                    "#e6c9a8"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todo",
            isPinned: true,
            info: {
                label: "Prepare for vacation",
                todos: [
                    { txt: "Check in to the flight", doneAt: null, id: utilService.makeId() },
                    { txt: "Pack snacks", doneAt: null, id: utilService.makeId() },
                    { txt: "Take out the trash", doneAt: null, id: utilService.makeId() },
                    { txt: "Set an away message in the email", doneAt: new Date(), id: utilService.makeId() },
                    { txt: "Put bags near the door!", doneAt: null, id: utilService.makeId() }
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
    noteToUpdate.info.title = val
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return noteToUpdate
}

function updateNoteVideo(val, noteToUpdate) {
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
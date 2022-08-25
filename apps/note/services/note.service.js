import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
export const noteService = {
    query,
    addNote,
    deleteNote
}

const STORAGE_KEY = 'notesDB'

function _demoData() {
    const notes = [
        {
            id: utilService.makeId(),
            type: "note-txt",
            // isPinned: true,
            info: {
                txt: utilService.makeLorem(35)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                txt: utilService.makeLorem(50)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            // isPinned: true,
            info: {
                txt: utilService.makeLorem(20)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                txt: utilService.makeLorem(15)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "https://picsum.photos/300/200",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor:
                    "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            // isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                txt: utilService.makeLorem(70)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            info: {
                txt: utilService.makeLorem(10)
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "https://picsum.photos/300/300",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor:
                    "#00d"
            }
        }
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         label: "Get my stuff together",
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }
        //         ]
        //     }
        // }
    ]
    return notes
}

function query() {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    if (!notes) {
        notes = _demoData()
        storageService.saveToStorage(STORAGE_KEY, notes)
    }
    return Promise.resolve(notes)
}

function addNote(txt, noteType) {
    let newNote
    if (noteType === 'txt') newNote = createNoteTxt(txt)
    else if (noteType === 'img' || 'video') newNote = createNotewithtUrl(txt, noteType)
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

function createNotewithtUrl(txt, noteType) {
    return {
        id: utilService.makeId(),
        type: 'note-' + noteType,
        info: {
            url: txt,
        }
    }
}

function deleteNote(noteId) {
    // console.log('delte me from server', noteId)
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    notes = notes.filter(note => note.id !== noteId)
    storageService.saveToStorage(STORAGE_KEY, notes)
    return Promise.resolve()
}

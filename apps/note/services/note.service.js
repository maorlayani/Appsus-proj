import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query
}

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
            id: "n102",
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
            id: "n102",
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
    const note = _demoData()
    return Promise.resolve(note)
}
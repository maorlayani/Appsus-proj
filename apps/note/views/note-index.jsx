import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteFolderList } from "../cmps/note-folder-list.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";

import { noteService } from '../services/note.service.js'

export class NoteIndex extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then((notes) => this.setState({ notes }))
    }

    onAddNote = (txt, noteType) => {
        console.log('in index txt', txt)
        console.log('in index noteType', noteType)
        noteService.addNote(txt, noteType)
            .then((note) => {
                this.setState(({ notes }) => ({ notes: [note, ...notes] }))
            })
    }

    onDeleteNote = (noteId) => {
        // console.log('delete me!', noteId)
        let { notes } = this.state
        noteService.deleteNote(noteId)
            .then(() => {
                notes = notes.filter(note => note.id !== noteId)
                this.setState({ notes })
            })
    }

    render() {
        const { notes } = this.state
        const { onAddNote, onDeleteNote } = this
        if (!notes) return <h2>Loading...</h2>
        return (
            <div className="note-index flex column align-center">
                <NoteCompose onAddNote={onAddNote} />
                <NoteList notes={notes} onDeleteNote={onDeleteNote} />
                {/* <NoteFilter />
                <NoteFolderList />
                */}
            </div>
        )
    }
}

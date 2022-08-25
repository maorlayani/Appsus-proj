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

    onUpdetaNote = (val, note) => {
        if (!val) return
        // console.log(val, note)
        let { notes } = this.state
        noteService.updateNote(val, note)
            .then((updatedNote) => {
                notes = notes.map(note => notes.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes })
            })
    }

    onUpdateTodoNote = (note) => {
        // console.log('UPDATED TODO from index', note)
        let { notes } = this.state
        noteService.updateNoteTodo(note)
            .then((updatedNote) => {
                notes = notes.map(note => notes.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes })
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
        const { onAddNote, onDeleteNote, onUpdetaNote, onUpdateTodoNote } = this
        if (!notes) return <h2>Loading...</h2>
        return (
            <div className="note-index flex column align-center">
                <NoteCompose onAddNote={onAddNote} />
                <NoteList notes={notes} onDeleteNote={onDeleteNote} onUpdetaNote={onUpdetaNote} onUpdateTodoNote={onUpdateTodoNote} />
                {/* <NoteFilter />
                <NoteFolderList />
                */}
            </div>
        )
    }
}

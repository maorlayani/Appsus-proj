import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteFolderList } from "../cmps/note-folder-list.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";

import { noteService } from '../services/note.service.js'

export class NoteIndex extends React.Component {
    state = {
        notes: null,
        pinnedNotes: [],
        unPinnedNotes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then((notes) => {
                let { pinnedNotes, unPinnedNotes } = this.state
                pinnedNotes = notes.filter(note => (note.isPinned))
                unPinnedNotes = notes.filter(note => (!note.isPinned))
                this.setState({ notes, pinnedNotes, unPinnedNotes })
            })
    }

    onAddNote = (txt, noteType) => {
        noteService.addNote(txt, noteType)
            .then((note) => {
                this.setState(({ notes }) => ({ notes: [note, ...notes] }))
            })
    }

    onUpdetaNote = (val, note) => {
        if (!val) return
        let { notes } = this.state
        noteService.updateNote(val, note)
            .then((updatedNote) => {
                notes = notes.map(note => notes.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes })
            })
    }

    onUpdateTodoNote = (note) => {
        let { notes } = this.state
        noteService.updateNoteTodo(note)
            .then((updatedNote) => {
                notes = notes.map(note => notes.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes })
            })
    }

    onDeleteNote = (noteId) => {
        let { notes } = this.state
        noteService.deleteNote(noteId)
            .then(() => {
                notes = notes.filter(note => note.id !== noteId)
                this.setState({ notes })
            })
    }

    onCopyNote = (ev, copiedNote) => {
        ev.stopPropagation()
        let { notes } = this.state
        noteService.copyNote(copiedNote)
            .then((note) => {
                notes.unshift(note)
                this.setState({ notes })
            })
    }

    onSortNotesByPinned = (note) => {
        noteService.updateNoteTodo(note)
            .then(() => {
                this.loadNotes()
            })
    }

    render() {
        const { notes, pinnedNotes, unPinnedNotes } = this.state
        const { onAddNote, onDeleteNote, onUpdetaNote, onUpdateTodoNote, onCopyNote, onSortNotesByPinned } = this
        if (!notes) return <h2>Loading...</h2>
        return (
            <div className="note-index flex column align-center">
                <NoteCompose onAddNote={onAddNote} />
                <NoteList notes={notes}
                    onDeleteNote={onDeleteNote}
                    onUpdetaNote={onUpdetaNote}
                    onUpdateTodoNote={onUpdateTodoNote}
                    onCopyNote={onCopyNote}
                    onSortNotesByPinned={onSortNotesByPinned}
                    pinnedNotes={pinnedNotes}
                    unPinnedNotes={unPinnedNotes} />
                {/* <NoteFilter />
                <NoteFolderList />
                */}
            </div>
        )
    }
}

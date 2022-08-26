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
                // let { pinnedNotes, unPinnedNotes } = this.state
                // pinnedNotes = notes.filter(note => (note.isPinned))
                // unPinnedNotes = notes.filter(note => (!note.isPinned))
                this.setState({ notes }, this.filterNotesByPinned)
            })
    }

    onAddNote = (noteTitle, noteTxt, noteType) => {
        noteService.addNote(noteTitle, noteTxt, noteType)
            .then((note) => {
                this.setState(({ notes }) => ({ notes: [note, ...notes] }), this.filterNotesByPinned)
            })
    }

    onUpdetaNote = (title, txt, note) => {
        // if (!title && !txt) return
        let { notes } = this.state
        noteService.updateNote(title, txt, note)
            .then((updatedNote) => {
                notes = notes.map(note => note.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes }, this.filterNotesByPinned)
            })
    }

    onUpdateTodoNote = (note) => {
        let { notes } = this.state
        noteService.updateNoteTodo(note)
            .then((updatedNote) => {
                notes = notes.map(note => note.id === updatedNote.id ? updatedNote : note)
                this.setState({ notes }, this.filterNotesByPinned)
            })
    }

    onDeleteNote = (noteId) => {
        let { notes } = this.state
        noteService.deleteNote(noteId)
            .then(() => {
                notes = notes.filter(note => note.id !== noteId)
                this.setState({ notes }, this.filterNotesByPinned)
            })
    }

    onCopyNote = (ev, copiedNote) => {
        ev.stopPropagation()
        let { notes } = this.state
        noteService.copyNote(copiedNote)
            .then((note) => {
                notes.unshift(note)
                this.setState({ notes }, this.filterNotesByPinned)
            })
    }

    onSortNotesByPinned = (note) => {
        noteService.updateNoteTodo(note)
            .then(() => {
                this.loadNotes()
            })
    }

    filterNotesByPinned = () => {
        let { pinnedNotes, unPinnedNotes, notes } = this.state
        pinnedNotes = notes.filter(note => (note.isPinned))
        unPinnedNotes = notes.filter(note => (!note.isPinned))
        this.setState({ pinnedNotes, unPinnedNotes })
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

import { NotePreview } from "./note-preview.jsx";

export class NoteList extends React.Component {

    render() {
        const { notes, onDeleteNote, onUpdetaNote, onUpdateTodoNote, onCopyNote, onSortNotesByPinned, pinnedNotes, unPinnedNotes } = this.props
        // console.log(pinnedNotes)
        return <section className="note-list note-main-layout">
            {pinnedNotes[0] && <div className="notes-list-title">PINNED</div>}
            <div className="note-list-container">
                {pinnedNotes.map(note =>
                    <NotePreview
                        note={note}
                        key={note.id}
                        onDeleteNote={onDeleteNote}
                        onUpdetaNote={onUpdetaNote}
                        onUpdateTodoNote={onUpdateTodoNote}
                        onCopyNote={onCopyNote}
                        onSortNotesByPinned={onSortNotesByPinned}
                    />)}
            </div>
            {pinnedNotes[0] && <div className="notes-list-title">OTHERS</div>}
            <div className="note-list-container">
                {unPinnedNotes.map(note =>
                    <NotePreview
                        note={note}
                        key={note.id}
                        onDeleteNote={onDeleteNote}
                        onUpdetaNote={onUpdetaNote}
                        onUpdateTodoNote={onUpdateTodoNote}
                        onCopyNote={onCopyNote}
                        onSortNotesByPinned={onSortNotesByPinned}
                    />)}
            </div>
        </section>

    }
}

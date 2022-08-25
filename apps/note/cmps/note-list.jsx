import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onDeleteNote, onUpdetaNote, onUpdateTodoNote }) {

    return <section className="note-list note-main-layout">
        <div className="note-list-container">
            {notes.map(note => <NotePreview
                note={note}
                key={note.id}
                onDeleteNote={onDeleteNote}
                onUpdetaNote={onUpdetaNote}
                onUpdateTodoNote={onUpdateTodoNote} />)}
        </div>
    </section>
}
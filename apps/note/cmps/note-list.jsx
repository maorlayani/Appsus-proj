import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onDeleteNote }) {
    return <section className="note-list note-main-layout">
        <div className="note-list-container">
            {notes.map(note => <NotePreview note={note} key={note.id} onDeleteNote={onDeleteNote} />)}
        </div>
    </section>
}
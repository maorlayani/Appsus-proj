import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes }) {
    return <section className="note-list note-main-layout">
        <div className="note-list-container">
            {notes.map(note => <NotePreview note={note} key={note.id} />)}
        </div>
    </section>
}
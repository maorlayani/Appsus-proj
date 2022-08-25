export function NoteToolBar({ onDeleteNote, noteId }) {
    return <section className="note-tool-bar">
        <button className="btn-note-toolbar btn-delete" onClick={() => onDeleteNote(noteId)}></button>
    </section>
}
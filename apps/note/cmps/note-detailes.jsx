import { DynamicCmp } from "./dynamic-cmp.jsx";
import { NoteToolBar } from "./note-tool-bar.jsx";

export class NoteDetails extends React.Component {
    state = {
        noteTxtUpdatedVal: ''
    }

    updateNoteTxtVal = (val) => {
        this.setState({ noteTxtUpdatedVal: val })
    }

    render() {
        // console.log('FROM DETAILS-COM isOnDetailsDisplay', isOnDetailsDisplay)
        const { note, onDeleteNote, setOnDetailsDisplay, isOnDetailsDisplay, onUpdetaNote, onUpdateTodoNote } = this.props
        const { noteTxtUpdatedVal } = this.state
        const { updateNoteTxtVal } = this

        return <section className="note-details">
            <div className="note-preview-container">
                <div className="note-preview focus">
                    <DynamicCmp
                        note={note}
                        isOnDetailsDisplay={isOnDetailsDisplay}
                        onUpdetaNote={onUpdetaNote}
                        updateNoteTxtVal={updateNoteTxtVal}
                        onUpdateTodoNote={onUpdateTodoNote}
                    />
                    <div className="toolbar-container">
                        <NoteToolBar
                            onDeleteNote={onDeleteNote}
                            noteId={note.id} />
                    </div>
                </div>
            </div>
            <div className="main-screen" onClick={() => {
                setOnDetailsDisplay(false)
                onUpdetaNote(noteTxtUpdatedVal, note)
            }}></div>
        </section >
    }
}
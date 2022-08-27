import { DynamicCmp } from "./dynamic-cmp.jsx";
import { NoteToolBar } from "./note-tool-bar.jsx";

export class NoteDetails extends React.Component {
    state = {
        updatedTxtnoteVal: this.props.note.info.txt,
        updatedTxtnoteTitle: this.props.note.info.title,
        updatedTodoNote: ''
    }

    updateNoteTxtVal = (TitleValue, textAreaValue) => {
        this.setState({ updatedTxtnoteTitle: TitleValue, updatedTxtnoteVal: textAreaValue })
    }

    updadteTxtTodoNote = (note) => {
        this.setState({ updatedTodoNote: note })
    }

    render() {
        // console.log('FROM DETAILS-COM isOnDetailsDisplay', isOnDetailsDisplay)
        const { note, onDeleteNote, setOnDetailsDisplay, isOnDetailsDisplay, onUpdetaNote, onUpdateTodoNote, onCopyNote, onSortNotesByPinned } = this.props
        const { updatedTxtnoteVal, updatedTxtnoteTitle, updatedTodoNote } = this.state
        const { updateNoteTxtVal, updadteTxtTodoNote } = this
        // console.log('from details', updatedTodoNote)
        return <section className="note-details">
            <div className="note-preview-container">
                <div className="note-preview focus" style={{ backgroundColor: note.style.backgroundColor }}>
                    <DynamicCmp
                        note={note}
                        isOnDetailsDisplay={isOnDetailsDisplay}
                        onUpdetaNote={onUpdetaNote}
                        updateNoteTxtVal={updateNoteTxtVal}
                        onUpdateTodoNote={onUpdateTodoNote}
                        updadteTxtTodoNote={updadteTxtTodoNote}

                    />
                    <div className="container-test">
                        <div className="toolbar-container">
                            <NoteToolBar
                                onDeleteNote={onDeleteNote}
                                note={note}
                                onUpdateTodoNote={onUpdateTodoNote}
                                onCopyNote={onCopyNote}
                                onSortNotesByPinned={onSortNotesByPinned}
                                setOnDetailsDisplay={setOnDetailsDisplay}
                                isOnDetailsDisplay={isOnDetailsDisplay} />
                        </div>
                    </div>
                </div>


            </div>
            <div className="main-screen" onClick={() => {
                setOnDetailsDisplay(false)
                onUpdetaNote(updatedTxtnoteTitle, updatedTxtnoteVal, note)
                // onUpdateTodoNote(updatedTodoNote)
            }}></div>
        </section >
    }
}
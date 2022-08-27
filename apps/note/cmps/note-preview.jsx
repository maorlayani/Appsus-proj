import { NoteToolBar } from './note-tool-bar.jsx'
import { DynamicCmp } from './dynamic-cmp.jsx'
import { NoteDetails } from './note-detailes.jsx'

export class NotePreview extends React.Component {
    state = {
        isMouseHover: false,
        isOnDetailsDisplay: false
    }

    handleMouseOver = () => {
        this.setState({ isMouseHover: true })
    }

    handleMouseOut = () => {
        this.setState({ isMouseHover: false })
    }

    setOnDetailsDisplay = (isOn) => {
        // console.log(isOn)
        this.setState(({ isOnDetailsDisplay: isOn }))
    }

    render() {
        const { note, onDeleteNote, onUpdetaNote, onUpdateTodoNote, onCopyNote, onSortNotesByPinned } = this.props
        const { isMouseHover, isOnDetailsDisplay } = this.state
        const { handleMouseOver, handleMouseOut, setOnDetailsDisplay } = this
        return <section >
            <div
                className={'note-preview'}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => setOnDetailsDisplay(true)}
                style={{ backgroundColor: note.style.backgroundColor }}>
                <DynamicCmp note={note} onUpdateTodoNote={onUpdateTodoNote} />
                {isMouseHover && <NoteToolBar
                    onDeleteNote={onDeleteNote}
                    note={note}
                    onUpdateTodoNote={onUpdateTodoNote}
                    onCopyNote={onCopyNote}
                    onSortNotesByPinned={onSortNotesByPinned}
                />}
            </div>
            {isOnDetailsDisplay && <NoteDetails
                note={note}
                onDeleteNote={onDeleteNote}
                isOnDetailsDisplay={isOnDetailsDisplay}
                setOnDetailsDisplay={setOnDetailsDisplay}
                onUpdetaNote={onUpdetaNote}
                onUpdateTodoNote={onUpdateTodoNote}
                onCopyNote={onCopyNote}
                onSortNotesByPinned={onSortNotesByPinned}

            />}
        </section >
    }
}
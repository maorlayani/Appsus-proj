import { NoteToolBar } from './note-tool-bar.jsx'
import { DynamicCmp } from './dynamic-cmp.jsx'

export class NotePreview extends React.Component {
    state = {
        isMouseHover: false
    }

    handleMouseOver = () => {
        this.setState({ isMouseHover: true })
    }

    handleMouseOut = () => {
        this.setState({ isMouseHover: false })
    }

    render() {
        const { note, onDeleteNote } = this.props
        const { isMouseHover } = this.state
        const { handleMouseOver, handleMouseOut } = this
        return <section className="note-preview" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <DynamicCmp note={note} />
            {isMouseHover && <NoteToolBar onDeleteNote={onDeleteNote} noteId={note.id} />}
        </section >
    }
}
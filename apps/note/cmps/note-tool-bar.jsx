export class NoteToolBar extends React.Component {
    state = {
        isShowColorDropdown: false
    }

    colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

    showColorDropDown = (ev) => {
        ev.stopPropagation()
        this.setState((prevState) => ({ isShowColorDropdown: !prevState.isShowColorDropdown }), () => {
        })
    }

    onSelectbackgroundColor = (ev, color) => {
        ev.stopPropagation()
        let { note, onUpdateTodoNote } = this.props
        console.log(note)
        note.style.backgroundColor = color
        onUpdateTodoNote(note)
    }

    onTogglePinned = (ev, note) => {
        ev.stopPropagation()
        note.isPinned = !note.isPinned
        console.log(note)
        this.props.onSortNotesByPinned(note)
    }


    render() {
        const { onDeleteNote, note, onCopyNote } = this.props
        const { isShowColorDropdown } = this.state
        const { showColorDropDown, colors, onSelectbackgroundColor, onTogglePinned } = this

        return <section
            className="note-tool-bar">

            <button className="btn-note-toolbar btn-delete" onClick={() => onDeleteNote(note.id)}></button>
            <button className="btn-note-toolbar btn-color-picker" onClick={(ev) => showColorDropDown(ev)}></button>
            <button className="btn-note-toolbar btn-copy" onClick={(ev) => onCopyNote(ev, note)}></button>
            <button className="btn-note-toolbar btn-pin" onClick={(ev) => onTogglePinned(ev, note)}></button>

            <div className={'toolbar-color-container flex ' + (isShowColorDropdown ? 'show' : '')}>
                {colors.map(color => {
                    return <div
                        className={"toolbar-color " + (isShowColorDropdown ? 'show' : '')}
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={(ev) => onSelectbackgroundColor(ev, color)} ></div>
                })}
            </div>

        </section>
    }

}

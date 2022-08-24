import { NoteToolBar } from "./note-tool-bar.jsx";

export class NoteCompose extends React.Component {

    noteTxtInputRef = React.createRef()
    state = {
        isOnFocus: false,
        noteTxt: '',
        noteTitle: ''
    }

    isInputOnFocus = () => {
        // this.setState(({ isOnFocus }) => ({ isOnFocus: !isOnFocus }))
        this.setState(({ isOnFocus: true }), () => {
            this.noteTxtInputRef.current.focus()
        })
    }

    changeHandler = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    onSubmitNote = (ev) => {
        ev.preventDefault()
        this.props.onAddNoteTxt(this.state.noteTxt)
        this.setState(({ isOnFocus: false, noteTxt: '' }))
    }

    onAddNoteImg = (ev) => {
        ev.stopPropagation()
    }

    render() {
        const { isOnFocus } = this.state
        const { isInputOnFocus, changeHandler, onSubmitNote, onAddNoteImg, noteTxtInputRef } = this

        return <section className="note-compose">

            {/* {isOnFocus && <input type="text" name="noteTitle" id="noteTitle" placeholder="Title" />} */}
            {/* <div className="note-compose-container flex align-center space-between" onClick={isInputOnFocus} > */}
            <div className="note-compose-container flex align-center" onClick={isInputOnFocus} >
                {!isOnFocus && <span>Take a note..</span>}
                {isOnFocus && <form onSubmit={onSubmitNote}>
                    <input type="text" name="noteTxt" id="noteTxt" ref={noteTxtInputRef} placeholder="Take a note.." onChange={changeHandler} />
                </form>}
                {!isOnFocus && <div className="btn-compose-container">
                    <button className="btn-note-compose btn-add-todo"></button>
                    <button className="btn-note-compose btn-add-img" onClick={onAddNoteImg}></button>
                </div>}
            </div>

            {/* <NoteToolBar /> */}
        </section>
    }

}


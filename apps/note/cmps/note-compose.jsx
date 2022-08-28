import { NoteToolBar } from "./note-tool-bar.jsx";

export class NoteCompose extends React.Component {

    noteTxtInputRef = React.createRef()
    state = {
        isOnFocus: false,
        noteType: null,
        noteTxt: '',
        noteTitle: '',
        inputPlaceholder: 'Take a note...',
        isNoteImg: false
    }

    isInputOnFocus = () => {
        this.setState(({ isOnFocus: true }), () => {
            this.setTxtInputPlaceholder()
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
        this.setState({ isOnFocus: false })
        const { noteTitle, noteTxt, noteType } = this.state
        this.props.onAddNote(noteTitle, noteTxt, noteType)
        this.setState(({
            noteType: null,
            noteTxt: '',
            noteTitle: '',
            inputPlaceholder: 'Take a note...',
        }))
    }

    onAddNoteImg = (ev) => {
        this.setState(({ isNoteImg }) => ({ isNoteImg: !isNoteImg }), () => {
        })
    }

    onInputFocus = () => {
        if (!this.state.noteType) this.onSetNoteType('txt')
        this.setState({ isOnFocus: true })
    }

    onSetNoteType = (type) => {
        this.setState({ noteType: type }, () => {
            this.setTxtInputPlaceholder()
        })
    }

    setTxtInputPlaceholder = () => {
        const { noteType } = this.state
        let placeholder
        switch (noteType) {
            case 'txt':
                placeholder = 'Take a note...'
                break
            case 'video':
                placeholder = 'Enter video URL...'
                break
            case 'todo':
                placeholder = 'Enter comma separated list...'
                break
            case 'img':
                placeholder = 'Enter image URL...'
                break
        }
        this.setState({ inputPlaceholder: placeholder })
    }

    render() {
        const { isOnFocus, noteTxt, inputPlaceholder, noteType, noteTitle } = this.state
        const { isInputOnFocus, onInputFocus, changeHandler, onSubmitNote, onSetNoteType, noteTxtInputRef } = this
        return <section className="note-compose">

            <div className="note-compose-container flex align-center" >
                <form onSubmit={onSubmitNote}>
                    {isOnFocus && <input
                        type="text"
                        name="noteTitle"
                        id="noteTitle"
                        value={noteTitle}
                        placeholder="Title"
                        onChange={changeHandler} />}
                    <input
                        className={(isOnFocus ? 'openend' : '')}
                        type="text"
                        name="noteTxt"
                        id="noteTxt"
                        value={noteTxt}
                        ref={noteTxtInputRef}
                        placeholder={inputPlaceholder}
                        onChange={changeHandler}
                        onClick={onInputFocus} />
                    {isOnFocus && <button className="btn-compose-add-note" type="submit">Add Note</button>}
                </form>
                <div className="btn-compose-container">
                    <button
                        className={'btn-note-compose btn-add-txt ' + (noteType === 'txt' ? 'active' : '')}
                        onClick={() => onSetNoteType('txt')}>

                    </button>
                    <button
                        className={'btn-note-compose btn-add-video ' + (noteType === 'video' ? 'active' : '')}
                        onClick={() => onSetNoteType('video')}>

                    </button>
                    <button
                        className={'btn-note-compose btn-add-todo ' + (noteType === 'todo' ? 'active' : '')}
                        onClick={() => onSetNoteType('todo')}>

                    </button>
                    <button
                        className={'btn-note-compose btn-add-img ' + (noteType === 'img' ? 'active' : '')}
                        onClick={() => onSetNoteType('img')}>

                    </button>
                </div>
            </div>
        </section >
    }

}


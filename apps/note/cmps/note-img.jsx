import { LongTxt } from '../../../cmps/long-txt.jsx'

export class NoteImg extends React.Component {

    state = {
        textInputValue: this.props.note.info.title
    }

    componentDidMount() {
        if (!this.props.updateNoteTxtVal) return
        this.props.updateNoteTxtVal(this.state.textInputValue)
    }

    notImgChangeHandler = ({ target }) => {
        const { value } = target
        this.setState(({ textInputValue: value }), () => {
            this.props.updateNoteTxtVal(this.state.textInputValue)
        })
    }

    render() {
        const { note, isOnDetailsDisplay } = this.props
        const { textInputValue } = this.state
        const { notImgChangeHandler } = this

        return <div className="note-img">
            <img src={note.info.url} />
            {/* {!isOnDetailsDisplay && <h4>{note.info.title}</h4>} */}
            {!isOnDetailsDisplay && <LongTxt title={note.info.title} />}
            {isOnDetailsDisplay && <input
                type="text"
                name="note-img-title"
                placeholder="Title"
                value={textInputValue}
                onChange={notImgChangeHandler}
                style={{ backgroundColor: note.style.backgroundColor }}
            ></input>}
        </div>
    }

}


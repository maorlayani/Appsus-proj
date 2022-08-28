import { LongTxt } from '../../../cmps/long-txt.jsx'

export class NoteTxt extends React.Component {
    state = {
        textAreaValue: this.props.note.info.txt,
        TitleValue: this.props.note.info.title
    }

    noteTxtChangeHandler = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            const { TitleValue, textAreaValue } = this.state
            this.props.updateNoteTxtVal(TitleValue, textAreaValue)
        })
    }

    render() {
        const { note, isOnDetailsDisplay } = this.props
        const { textAreaValue, TitleValue } = this.state
        const { noteTxtChangeHandler } = this

        return <div className="note-txt">
            {!isOnDetailsDisplay && <LongTxt title={note.info.title} />}
            {isOnDetailsDisplay && <input
                type="text"
                name="TitleValue"
                placeholder="Title"
                value={TitleValue}
                onChange={noteTxtChangeHandler}
                style={{ backgroundColor: note.style.backgroundColor }}
            ></input>}
            {!isOnDetailsDisplay && <p className={(!note.info.title ? 'add-pad' : '')}><LongTxt txt={note.info.txt} /></p>}
            {isOnDetailsDisplay && <textarea
                type="textarea"
                name="textAreaValue"
                placeholder="Take a note..."
                id=""
                value={textAreaValue}
                onChange={noteTxtChangeHandler}
                style={{ backgroundColor: note.style.backgroundColor }} />}
        </div>
    }
}



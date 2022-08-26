export class NoteTxt extends React.Component {
    state = {
        textAreaValue: this.props.note.info.txt,
        TitleValue: this.props.note.info.title
    }

    componentDidMount() {
        if (!this.props.updateNoteTxtVal) return
        this.props.updateNoteTxtVal(this.state.textAreaValue)
    }

    noteTxtChangeHandler = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            const { TitleValue, textAreaValue } = this.state
            this.props.updateNoteTxtVal(TitleValue, textAreaValue)
        })
        // const { value } = target
        // this.setState(({ textAreaValue: value }), () => {
        //     this.props.updateNoteTxtVal(this.state.textAreaValue)
        // })
    }

    render() {
        const { note, isOnDetailsDisplay } = this.props
        const { textAreaValue, TitleValue } = this.state
        const { noteTxtChangeHandler } = this

        return <div className="note-txt">
            {!isOnDetailsDisplay && <h4>{note.info.title}</h4>}
            {isOnDetailsDisplay && <input
                type="text"
                name="TitleValue"
                placeholder="Title"
                value={TitleValue}
                onChange={noteTxtChangeHandler}
                style={{ backgroundColor: note.style.backgroundColor }}
            ></input>}
            {!isOnDetailsDisplay && <p>{note.info.txt}</p>}
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



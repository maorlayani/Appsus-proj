export class NoteTxt extends React.Component {
    state = {
        textAreaValue: this.props.note.info.txt
    }

    componentDidMount() {
        if (!this.props.updateNoteTxtVal) return
        this.props.updateNoteTxtVal(this.state.textAreaValue)
    }

    notTxtChangeHandler = ({ target }) => {
        const { value } = target
        this.setState(({ textAreaValue: value }), () => {
            this.props.updateNoteTxtVal(this.state.textAreaValue)
        })
    }

    render() {
        const { note, isOnDetailsDisplay } = this.props
        const { textAreaValue } = this.state
        const { notTxtChangeHandler } = this

        return <div className="note-txt">
            {!isOnDetailsDisplay && <p>{note.info.txt}</p>}
            {isOnDetailsDisplay && <textarea
                type="textarea"
                name="note-txt"
                id=""
                value={textAreaValue}
                onChange={notTxtChangeHandler}
                style={{ backgroundColor: note.style.backgroundColor }} />}
        </div>
    }

}



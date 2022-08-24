
export function NoteImg(props) {
    const { info } = props
    return <div className="note-img">
        <img src={info.url} />
        <h4>{info.title}</h4>
    </div>
}


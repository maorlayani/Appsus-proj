export function NoteVideo(props) {
    const { info } = props
    console.log(info.url)
    return <div className="note-video">
        {/* <iframe src="https://www.google.com/webhp?igu=1"></iframe> */}
        <iframe src={info.url} frameBorder="0"></iframe>
        {/* <a href={info.url}>{info.url}</a> */}
        <h4>{info.title}</h4>
    </div>
}
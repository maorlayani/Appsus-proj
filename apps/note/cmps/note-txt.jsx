export function NoteTxt(props) {
    // console.log(props)
    const { info } = props
    return <div className="note-txt">
        <p>{info.txt}</p>
    </div>
}



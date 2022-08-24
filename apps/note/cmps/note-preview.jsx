import { NoteToolBar } from './note-tool-bar.jsx'
import { DynamicCmp } from './DynamicCmp.jsx'

export class NotePreview extends React.Component {


    render() {
        const { note } = this.props
        return <section className="note-preview">
            {/* <h4>{note.info.txt}</h4> */}
            {/* <NoteToolBar /> */}
            <DynamicCmp note={note} />
        </section >
    }
}
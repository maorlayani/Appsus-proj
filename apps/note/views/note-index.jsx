import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteFolderList } from "../cmps/note-folder-list.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";

import { noteService } from '../services/note.service.js'

export class NoteIndex extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then((notes) => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state
        if (!notes) return <h2>Loading...</h2>
        return (
            <div className="note-index">
                <h1>note app</h1>
                <NoteList notes={notes} />
                {/* <NoteFilter />
                <NoteFolderList />
                <NoteCompose /> */}
            </div>
        )
    }
}

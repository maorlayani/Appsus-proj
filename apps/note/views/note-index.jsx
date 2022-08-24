import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteFolderList } from "../cmps/note-folder-list.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";

export class NoteIndex extends React.Component {
    render() {
        return (
            <div>
                <h1>note app</h1>
                <NoteList />
                <NoteFilter />
                <NoteFolderList />
                <NoteCompose />
            </div>
        )
    }
}

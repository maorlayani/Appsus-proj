import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVideo } from './note-video.jsx'
import { NoteTodos } from './note-todos.jsx'

export function DynamicCmp(props) {
    switch (props.note.type) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg  {...props} />
        case 'note-video':
            return <NoteVideo  {...props} />
        case 'note-todo':
            return <NoteTodos  {...props} />
    }

}
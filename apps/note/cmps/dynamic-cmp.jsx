import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVideo } from './note-video.jsx'

export function DynamicCmp({ note }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...note} />
        case 'note-img':
            return <NoteImg {...note} />
        case 'note-video':
            return <NoteVideo {...note} />
    }

}
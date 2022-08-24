import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'

export function DynamicCmp({ note }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...note} />
        case 'note-img':
            return <NoteImg {...note} />
    }

}
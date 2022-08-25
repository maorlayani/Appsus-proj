export class NoteTodos extends React.Component {
    state = {
        todos: this.props.note.info.todos
    }

    onCheckboxClick = (ev, checkedTodo) => {
        if (!this.props.isOnDetailsDisplay) ev.stopPropagation()

        // if(checkedTodo.doneAt) 
        // checkedTodo.doneAt = new Date()
        checkedTodo.doneAt = (checkedTodo.doneAt) ? null : new Date()
        let { todos } = this.state
        let { note } = this.props
        todos = todos.map(todo => todo.txt === checkedTodo.txt ? checkedTodo : todo)
        this.setState({ todos }, () => {
            note.info.todos = this.state.todos
            // console.log('updetd note from todos', note)
            this.props.onUpdateTodoNote(note)
        })
    }
    onLableClick = (ev) => {
        if (!this.props.isOnDetailsDisplay) ev.preventDefault()
    }

    toggaleChecked = () => {

    }

    render() {
        const { info } = this.props.note
        const { onLableClick, onCheckboxClick } = this
        // console.log(info.todos)
        return <div className="note-todos">
            <h4>{info.label}</h4>
            {info.todos.map(todo => {
                return <div key={todo.txt} >
                    <input type="checkbox" name={todo.txt} id={todo.txt} onClick={(ev) => onCheckboxClick(ev, todo)} checked={(todo.doneAt ? true : false)} />
                    <label className={'todo ' + (todo.doneAt ? 'is-done' : '')} htmlFor={todo.txt} onClick={onLableClick} >{todo.txt}</label>
                </div>
            })
            }
        </div >
    }

}
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
        todos.sort((a, b) => {
            if (b.doneAt) return -1
            else return 1
        })
        this.setState({ todos }, () => {

            note.info.todos = this.state.todos
            // console.log('updetd note from todos', note)
            this.props.onUpdateTodoNote(note)
        })
    }
    onLableClick = (ev) => {
        if (!this.props.isOnDetailsDisplay) ev.preventDefault()
    }

    sortTodos = () => {
        let { todos } = this.state
        todos.sort((a, b) => {
            if (a.doneAt) return 1
            else return -1
        })
    }

    changeHandler = ({ target }) => {
        // console.log(target)
    }

    render() {
        const { isOnDetailsDisplay } = this.props
        const { info } = this.props.note
        const { onLableClick, onCheckboxClick, changeHandler } = this
        // console.log(info.todos)
        console.log('isOnDetailsDisplay', isOnDetailsDisplay)
        return <div className="note-todos">
            <h4>{info.label}</h4>
            {info.todos.map(todo => {
                return <div key={todo.txt} className="note-todo-container">
                    <input type="checkbox" name={todo.txt} id={todo.txt} onClick={(ev) => onCheckboxClick(ev, todo)} checked={(todo.doneAt ? true : false)} onChange={changeHandler} />
                    <label className={'todo ' + (todo.doneAt ? 'is-done' : '')} htmlFor={todo.txt} onClick={onLableClick} >{todo.txt}</label>
                    {isOnDetailsDisplay && <button className="btn-note-todo btn-delete-todo"></button>}
                </div>
            })
            }
        </div >
    }

}
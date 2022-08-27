import { LongTxt } from '../../../cmps/long-txt.jsx'

export class NoteTodos extends React.Component {

    state = {
        todos: this.props.note.info.todos,
        todoValues: {},
        todoLabelValue: this.props.note.info.label,
        isMouseHover: false
    }

    componentDidMount() {
        let { todos } = this.props.note.info
        let { todoValues } = this.state
        todos.forEach((todo, idx) => {
            todoValues[todo.id] = todo.txt
        })
        this.setState({ todoValues })
    }

    onCheckboxClick = (ev, checkedTodo) => {
        if (!this.props.isOnDetailsDisplay) ev.stopPropagation()
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
            this.props.onUpdateTodoNote(note)
        })
    }

    onDeleteTodo = (todoId) => {
        let { todos } = this.state
        let { note } = this.props
        todos = todos.filter(todo => todo.id !== todoId)
        this.setState({ todos }, () => {
            note.info.todos = this.state.todos
            this.props.onUpdateTodoNote(note)
        })
    }

    onLableClick = (ev) => {
        if (!this.props.isOnDetailsDisplay) ev.preventDefault()
    }

    changeHandler = ({ target }, updtaedTodo) => {
        const field = target.name
        const value = target.value
        updtaedTodo.txt = target.value
        this.setState((prevState) => ({
            todoValues: {
                ...prevState.todoValues,
                [field]: value
            }
        }), () => {
            let { todos } = this.state
            let { note } = this.props
            todos = todos.map(todo => todo.id === updtaedTodo.id ? updtaedTodo : todo)
            note.info.todos = todos
            this.setState({ todos }, () => {
                this.props.onUpdateTodoNote(note)
            })
        }
        )
    }

    changeHandler1 = () => {

    }

    changeHandlerLabel = ({ target }) => {
        const value = target.value
        let { note } = this.props
        note.info.label = value
        this.setState({ todoLabelValue: value }, () => {
            this.props.onUpdateTodoNote(note)
        })
    }

    render() {
        const { isOnDetailsDisplay, note } = this.props
        const { info } = this.props.note
        const { todoValues, todoLabelValue } = this.state
        const { onLableClick, onCheckboxClick, changeHandler, changeHandler1, onDeleteTodo, changeHandlerLabel } = this

        return <div className="note-todos">
            {!isOnDetailsDisplay && <LongTxt title={info.label} />}
            {isOnDetailsDisplay && <input
                type="text"
                name="note-todo-title"
                placeholder="Title"
                value={todoLabelValue}
                onChange={changeHandlerLabel}
                style={{ backgroundColor: note.style.backgroundColor }}
            ></input>}
            {
                info.todos.map((todo) => {
                    return <div
                        key={todo.id}
                        className={'note-todo-container flex ' + (isOnDetailsDisplay ? 'display-Details' : '')}>
                        <input
                            type="checkbox"
                            name="todo-checkbox"
                            id={todo.txt}
                            style={{ accentColor: note.style.backgroundColor }}
                            onClick={(ev) => onCheckboxClick(ev, todo)}
                            checked={(todo.doneAt ? true : false)}
                            onChange={changeHandler1} />
                        {!isOnDetailsDisplay && <label
                            className={'todo-label ' + (todo.doneAt ? 'is-done' : '')}
                            htmlFor={todo.txt}
                            onClick={onLableClick} ><LongTxt txt={todo.txt} isTodo={true} />
                        </label>}
                        {isOnDetailsDisplay && <input
                            className={'todo-txt ' + (todo.doneAt ? 'checked' : '')}
                            type="text"
                            name={todo.id}
                            id="todo-txt"
                            value={todoValues[todo.id] || ''}
                            onChange={(ev) => changeHandler(ev, todo)}
                            style={{ backgroundColor: note.style.backgroundColor }}
                        />}
                        {isOnDetailsDisplay && <button className="btn-note-todo btn-delete-todo" onClick={() => onDeleteTodo(todo.id)}></button>}
                    </div>
                })
            }
        </div >
    }
}
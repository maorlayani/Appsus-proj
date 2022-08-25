const { Route, Link } = ReactRouterDOM

export class MailFilter extends React.Component {
  state = {
    filterBy: {
      subject: '',
      selected: 'All',
    },
  }

  handelInputChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.props.onSetFilterBySearch(this.state.filterBy)
      }
    )
  }

  handelSelectedChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.props.onSetFilterBySelect(this.state.filterBy)
      }
    )
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilterBySearch(this.state.filterBy)
    this.props.onSetFilterBySelect(this.state.filterBy)
  }

  render() {
    const { subject } = this.state.filterBy

    return (
      <section className="mail-filter">
        <form onSubmit={this.onFilter}>
          <label htmlFor="filter-search"></label>
          <input
            type="text"
            id="filter-search"
            placeholder="Search..."
            name="subject"
            value={subject}
            onChange={this.handelInputChange}
          />

          <label htmlFor="filter-select"></label>
          <select
            className="filter-select"
            name="selected"
            id="filter-select"
            onChange={this.handelSelectedChange}
          >
            <option value="All">All</option>
            <option value="isRead">Unread</option>
            <option value="isImportant">Star</option>
            <option value="isCheck">Check</option>
          </select>
        </form>

        <button
          onClick={() => {
            this.props.history.push('/note')
          }}
        >
          Compose
        </button>
      </section>
    )
  }
}

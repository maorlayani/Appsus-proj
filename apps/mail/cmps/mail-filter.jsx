export class MailFilter extends React.Component {
  state = {
    filterBy: {
      subject: '',
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
        this.props.onSetFilter(this.state.filterBy)
      }
    )
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filterBy)
  }

  render() {
    const { subject } = this.state.filterBy
    console.log('subject:', subject)
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
        </form>
      </section>
    )
  }
}

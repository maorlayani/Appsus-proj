// import { MailTopNavbar } from '../cmps/mail-top-navbar.jsx'

export class MailCompose extends React.Component {
  state = {
    newMail: {
      sentBy: '',
      subject: '',
      body: '',
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

  onSentMail = (ev) => {
    ev.preventDefault()
    console.log('shaloomSent:')
  }
  render() {
    const { sentBy, subject, body } = this.state
    return (
      <section className="mail-trash">
        <form onSubmit={this.onSentMail}>
          <label htmlFor="sentBy"></label>
          <input
            type="text"
            id="sentBy"
            placeholder="sent By..."
            name="sentBy"
            value={sentBy}
            onChange={this.handelInputChange}
          />
          <label htmlFor="sent-subject"></label>
          <input
            type="text"
            id="sent-subject"
            placeholder="sent subject..."
            name="subject"
            value={subject}
            onChange={this.handelInputChange}
          />
        </form>
      </section>
    )
  }
}

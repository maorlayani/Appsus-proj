import { mailService } from '../services/mail.service.js'

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
    this.setState((prevState) => ({
      newMail: {
        ...prevState.newMail,
        [field]: value,
      },
    }))
  }

  onSentMail = (ev) => {
    ev.preventDefault()
    const newMail = this.state.newMail
    console.log('newMail:', newMail)
    mailService.sentMail(newMail)
    console.log('this.props:', this.props)
    this.props.onCompose()
  }

  onGoBack = () => {
    this.props.history.push('/mail')
    this.props.onCompose()
  }

  render() {
    const { sentBy, subject, body } = this.state
    const { onGoBack } = this
    return (
      <section className="mail-compose">
        <div className="header-compose">
          <h1>Sent Mail</h1>
          <button onClick={onGoBack}>X</button>
        </div>
        <form onSubmit={this.onSentMail}>
          <label htmlFor="sentBy"></label>
          <input
            ref={this.props.inputRef}
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

          <textarea
            name="body"
            id="text-area"
            cols="30"
            rows="10"
            onChange={this.handelInputChange}
            placeholder="please write mail..."
          ></textarea>

          <button>➣</button>
        </form>
      </section>
    )
  }
}

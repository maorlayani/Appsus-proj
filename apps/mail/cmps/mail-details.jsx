import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {
  state = {
    mail: null,
  }

  componentDidMount() {
    console.log('this.props:', this.props)
    this.loadMail()
  }

  loadMail = () => {
    const { mailId } = this.props.match.params
    mailService.getById(mailId).then((mail) => {
      this.setState({ mail })
    })
  }

  onGoBack = () => {
    this.props.history.push('/mail')
  }

  render() {
    const { mail } = this.state
    const { onGoBack } = this
    if (!mail) return <div>Loading...</div>
    return (
      <section className="mail-details">
        <div className="header-mail-details">
          <h1>
            {mail.sentBy} <span>{mail.sentAt}</span>
          </h1>
          <h2>{mail.subject}</h2>

          <button onClick={onGoBack}>Back</button>
        </div>

        <p>{mail.body}</p>
      </section>
    )
  }
}

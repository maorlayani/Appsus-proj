import { MailTopNavbar } from '../cmps/mail-top-navbar.jsx'

export function MailDetails({ mail, onGoBack, onRemoveMail }) {
  return (
    <section className="mail-details">
      <h1>
        {mail.sentBy} <span>{mail.sentAt}</span>
      </h1>
      <h2>{mail.subject}</h2>
      <p>{mail.body}</p>

      <MailTopNavbar />

      <button onClick={onGoBack}>Back</button>
      <button onClick={(event) => onRemoveMail(event, mail.id)}>Delete</button>
    </section>
  )
}

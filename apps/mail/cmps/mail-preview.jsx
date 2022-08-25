const { Link } = ReactRouterDOM

export function MailPreview({ mail, onSelectMail }) {
  return (
    <article className="mail-preview" onClick={() => onSelectMail(mail.id)}>
      <h4>{mail.sentBy}</h4>
      <h4>{mail.subject}</h4>
      <h5 className="mail-body">{mail.body}</h5>
      <h4>{mail.sentAt}</h4>
    </article>
  )
}

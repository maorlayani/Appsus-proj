const { Link } = ReactRouterDOM

export function MailPreview({ mail, onSelectMail }) {
  return (
    <article className="mail-preview" onClick={() => onSelectMail(mail.id)}>
      <h4 className="sent-by">{mail.sentBy}</h4>

      <div className="mail-preview-content">
        <p>{mail.subject}</p>
        <p className="mail-body">{mail.body}</p>
      </div>

      <h4 className="sent-at">{mail.sentAt}</h4>
    </article>
  )
}

export function MailPreview({ mail }) {
  return (
    <article className="mail-preview">
      <h4 className="sent-by">{mail.sentBy}</h4>

      <div className="mail-preview-content">
        <p>{mail.subject}</p>
        <p className="mail-body">{mail.body}</p>
      </div>

      <h4 className="sent-at">{mail.sentAt}</h4>
    </article>
  )
}

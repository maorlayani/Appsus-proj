const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
  return (
    <article className="mail-preview">
      <button>{mail.isCheck ? '☑︎' : '☐'}</button>
      <button>{mail.isSign ? '⭐️' : '☆'}</button>
      <h4>{mail.sentBy}</h4>
      <h4>{mail.subject}</h4>
      <h5 className="mail-body">{mail.body}</h5>
      <h4>{mail.sentAt}</h4>
      <ul>
        <li key={`${mail.id}file`}>✉️</li>
        <li key={`${mail.id}delete`}>🗑</li>
      </ul>
    </article>
  )
}

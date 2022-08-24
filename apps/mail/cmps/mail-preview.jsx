const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
  console.log('mail:', mail)
  return (
    <article className="mail-preview">
      <ul>
        <li key={`${mail.id}star`}>{mail.isSign ? '⭐️' : '☆'}</li>
        <li key={`${mail.id}sentBy`}>{mail.sentBy}</li>
        <li key={`${mail.id}subject`}>{mail.subject}</li>
        <li key={`${mail.id}body`}>{mail.body}</li>
        <li key={`${mail.id}check`}>{mail.isCheck ? '☑︎' : '☐'}</li>
        <li key={`${mail.id}file`}>✉️</li>
        <li key={`${mail.id}delete`}>🗑</li>
      </ul>
    </article>
  )
}

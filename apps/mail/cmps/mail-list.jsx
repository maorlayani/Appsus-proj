const { Link } = ReactRouterDOM

// import { mailService } from '../services.js'
import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSelectMail, onToggleBtn, onRemoveMail }) {
  function getReadClass(mail) {
    return mail.isRead ? 'mail-preview ' : 'mail-preview unRead'
  }

  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li className={getReadClass(mail)} key={mail.id}>
            <button
              onClick={() => {
                onToggleBtn(mail, 'isCheck')
              }}
            >
              {mail.isCheck ? '☑︎' : '☐'}
            </button>
            <button
              onClick={() => {
                onToggleBtn(mail, 'isImportant')
              }}
            >
              {mail.isImportant ? '⭐️' : '☆'}
            </button>

            <Link to={'/mail/' + mail.id}>
              <MailPreview mail={mail} onSelectMail={onSelectMail} />
            </Link>
            <Link
              to={`/mail/trash/${mail.id}`}
              onClick={() => {
                onRemoveMail(event, mail.id)
              }}
            >
              🗑
            </Link>
            <Link to={`/mail/compose/${mail.id}`}>✉️</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

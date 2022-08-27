const { Link } = ReactRouterDOM

// import { mailService } from '../services.js'
import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSelectMail, onToggleBtn, onRemoveMail }) {
  function getClassName(mail) {
    if (mail.isCheck) {
      return 'mail-preview check'
    }
    return mail.isRead ? 'mail-preview ' : 'mail-preview unRead'
  }

  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li className={getClassName(mail)} key={mail.id}>
            <button
              onClick={() => {
                onToggleBtn(mail, 'isCheck')
              }}
            >
              {mail.isCheck ? (
                <i className="fa-regular fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square"></i>
              )}
            </button>
            <button
              onClick={() => {
                onToggleBtn(mail, 'isStarred')
              }}
            >
              {mail.isStarred ? (
                <i
                  className="fa-solid fa-star"
                  style={{ color: 'rgb(234, 181, 7)' }}
                ></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </button>
            <button
              onClick={() => {
                onToggleBtn(mail, 'isImportant')
              }}
            >
              {mail.isImportant ? (
                <i
                  className="fa-solid fa-bookmark"
                  style={{ color: 'rgb(234, 181, 7)' }}
                ></i>
              ) : (
                <i className="fa-regular fa-bookmark"></i>
              )}
            </button>

            <Link to={'/mail/' + mail.id}>
              <MailPreview mail={mail} onSelectMail={onSelectMail} />
            </Link>

            <div className="btn-edit-mail">
              <Link
                to={`/mail/trash/${mail.id}`}
                onClick={() => {
                  onRemoveMail(event, mail.id)
                }}
              >
                <i className="fa-regular fa-trash-can"></i>
              </Link>
              <Link to={`/mail/compose/${mail.id}`}>
                <button
                  onClick={() => {
                    onToggleBtn(mail, 'isRead')
                  }}
                >
                  {mail.isRead ? (
                    <i className="fa-regular fa-envelope"></i>
                  ) : (
                    <i className="fa-regular fa-envelope-open"></i>
                  )}
                </button>
              </Link>
              <button>
                <i class="fa-regular fa-clock"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

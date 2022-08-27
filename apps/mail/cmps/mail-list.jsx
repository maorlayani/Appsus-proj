const { Link } = ReactRouterDOM

// import React from 'react'
import { mailService } from '../services/mail.service.js'
import { MailPreview } from './mail-preview.jsx'

export class MailList extends React.Component {
  state = {
    mails: [],
    sentMails: [],
    trashMails: [],
    filterBy: {
      subject: '',
      selected: '',
      starred: false,
      inbox: false,
      important: false,
      sent: false,
      trash: false,
    },
    selectedMail: null,
    isCompose: false,
    currView: 'mailCompose',
  }

  componentDidMount() {
    this.loadMails()
    // this.onSentMails()
    console.log('this.state.mails:', this.state.mails)
  }

  loadMails = () => {
    mailService
      .query(this.state.filterBy)
      .then((mails) => this.setState({ mails }))
  }

  getClassName = (mail) => {
    if (mail.isCheck) {
      return 'mail-preview check'
    }
    return mail.isRead ? 'mail-preview ' : 'mail-preview unRead'
  }

  getTypeMails = () => {
    const { sent, trash } = this.state.filterBy
    const { mails, sentMails, trashMails } = this.state
    if (sent) return sentMails
    if (trash) return trashMails
    return mails
  }

  onToggleBtn = (mail, field) => {
    console.log('mailId:', mail)
    console.log('mail[field]:', !mail[field])
    mail[field] = !mail[field]
    mailService.save(mail).then((mail) => this.loadMails())
  }

  onRemoveMail = (ev, mailId) => {
    console.log('ev:', ev)
    ev.stopPropagation()
    console.log('mailId:', mailId)
    mailService.remove(mailId).then(() => {
      const trashMails = this.state.trashMails.filter(
        (mail) => mail.id !== mailId
      )
      this.setState({ trashMails, selectedMail: null })
    })
  }

  onMoveTrashMail = (ev, mailId) => {
    console.log('ev:', ev)
    ev.stopPropagation()
    console.log('mailId:', mailId)
    mailService.moveToTrash(mailId).then(() => {
      const mails = this.state.mails.filter((mail) => mail.id !== mailId)
      this.setState({ mails, selectedMail: null })
    })
  }

  onTrashMails = () => {
    console.log('helllooo 0from 0Trash!!!')
    mailService
      .getTrashMail()
      .then((trashMails) => this.setState({ trashMails }))
  }

  render() {
    const {
      getTypeMails,
      getClassName,
      onToggleBtn,
      onRemoveMail,
      onTrashMails,
      onMoveTrashMail,
    } = this
    const { trash } = this.state.filterBy

    const mails = getTypeMails()
    console.log('mails:', mails)
    if (!mails || mails.length === 0) return <div>Loading...</div>
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
                  onToggleBtn(mail, 'starred')
                }}
              >
                {mail.starred ? (
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
                  onToggleBtn(mail, 'important')
                }}
              >
                {mail.important ? (
                  <i
                    className="fa-solid fa-bookmark"
                    style={{ color: 'rgb(234, 181, 7)' }}
                  ></i>
                ) : (
                  <i className="fa-regular fa-bookmark"></i>
                )}
              </button>

              <Link to={'/mail/details/' + mail.id}>
                <MailPreview mail={mail} />
              </Link>

              <div className="btn-edit-mail">
                <button
                  onClick={() => {
                    if (trash) {
                      onRemoveMail(event, mail.id)
                    } else {
                      onMoveTrashMail(event, mail.id)
                    }
                  }}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>

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

                <button>
                  <i className="fa-regular fa-clock"></i>
                </button>
                <button>
                  <i className="fa-regular fa-folder-arrow-down"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

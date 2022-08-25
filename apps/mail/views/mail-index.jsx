const { Route, Link } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailTopNavbar } from '../cmps/mail-top-navbar.jsx'
import { MailDetails } from '../views/mail-details.jsx'

import { mailService } from '../services/mail.service.js'

export class MailIndex extends React.Component {
  state = {
    mails: [],
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
  }

  componentDidMount() {
    this.loadMails()
  }

  loadMails = () => {
    mailService
      .query(this.state.filterBy)
      .then((mails) => this.setState({ mails }))
  }

  onSetFilterBySearch = (filterBy) => {
    console.log('filterBy:', filterBy)
    this.setState({ filterBy }, this.loadMails)
  }

  onSetFilterBySelect = (filterBy) => {
    console.log('filterBy:', filterBy)
    this.setState({ filterBy }, this.loadMails)
  }

  onSelectMail = (mailId) => {
    console.log('mailId:', mailId)
    mailService.getById(mailId).then((mail) => {
      if (mail) {
        mail.isRead = true
        mailService.save(mail).then((mail) => this.loadMails())
      }
      this.setState({ selectedMail: mail })
    })
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
      const mails = this.state.mails.filter((mail) => mail.id !== mailId)
      this.setState({ mails, selectedMail: null })
    })
  }

  onCompose = (isCompose) => {
    console.log('hiiii comp0se:')
    console.log('isCompose:', isCompose)
  }

  render() {
    const { mails, selectedMail, isCompose } = this.state
    console.log('mails:', isCompose)
    const {
      onSetFilterBySearch,
      onSetFilterBySelect,
      onSelectMail,
      onToggleBtn,
      onRemoveMail,
      onCompose,
    } = this
    return (
      <section className="mail-app">
        <MailFilter
          onSetFilterBySearch={onSetFilterBySearch}
          onSetFilterBySelect={onSetFilterBySelect}
        />
        <MailTopNavbar />

        <section className="main-content-app">
          <MailFolderList onCompose={onCompose} />

          {!selectedMail && (
            <MailList
              mails={mails}
              onSelectMail={onSelectMail}
              onToggleBtn={onToggleBtn}
              onRemoveMail={onRemoveMail}
            />
          )}

          {selectedMail && (
            <MailDetails
              mail={selectedMail}
              onGoBack={() => onSelectMail()}
              onRemoveMail={onRemoveMail}
            />
          )}
        </section>
      </section>
    )
  }
}

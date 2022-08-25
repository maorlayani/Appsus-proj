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
    },
    selectedMail: null,
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
    mailService
      .getById(mailId)
      .then((mail) => this.setState({ selectedMail: mail }))
  }

  onToggleBtn = (mail, field) => {
    console.log('mailId:', mail)
    console.log('mail[field]:', !mail[field])
    mail[field] = !mail[field]
    mailService.save(mail).then(() => this.loadMails)
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

  render() {
    const { mails, selectedMail } = this.state
    console.log('mails:', mails)
    const {
      onSetFilterBySearch,
      onSetFilterBySelect,
      onSelectMail,
      onToggleBtn,
      onRemoveMail,
    } = this
    return (
      <section className="mail-app">
        {!selectedMail && (
          <React.Fragment>
            <MailFilter
              onSetFilterBySearch={onSetFilterBySearch}
              onSetFilterBySelect={onSetFilterBySelect}
            />
            <MailFolderList />
            <MailList
              mails={mails}
              onSelectMail={onSelectMail}
              onToggleBtn={onToggleBtn}
              onRemoveMail={onRemoveMail}
            />
            <MailTopNavbar />
          </React.Fragment>
        )}
        {selectedMail && (
          <MailDetails
            mail={selectedMail}
            onGoBack={() => onSelectMail()}
            onRemoveMail={onRemoveMail}
          />
        )}
      </section>
    )
  }
}

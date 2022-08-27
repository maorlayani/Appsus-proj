const { Route, Link } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailTopNavbar } from '../cmps/mail-top-navbar.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailTrash } from '../cmps/mail-trash.jsx'
import { MailSent } from '../cmps/mail-sent.jsx'

import { mailService } from '../services/mail.service.js'

export class MailIndex extends React.Component {
  state = {
    mails: [],
    sentMails: [],
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
    this.onSentMails()
  }

  // DynamicCmp = (props) => {
  //   console.log('props:', props)
  //   switch (this.state.currView) {
  //     case 'hello':
  //       return <MailSent {...props} />

  //     case 'mailCompose':
  //       return <MailList {...props} />
  //   }
  // }

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

  onSetFilterByAside = (field, value) => {
    // console.log('this.state.filterBy:', this.state.filterBy)
    // console.log('onSetFilterByAside:', field)
    // console.log('onSetFilterByAside:', value)

    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.loadMails
        // console.log('this.state.filterBy:', this.state.filterBy)
      }
    )
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

  onCompose = () => {
    const toggle = !this.state.isCompose
    this.setState({ isCompose: toggle })
  }

  onSentMails = () => {
    console.log('hiiiiiiSenntttt')
    mailService.getSentMails().then((sentMails) => this.setState({ sentMails }))
  }

  render() {
    const { mails, selectedMail, isCompose, sentMails } = this.state
    console.log('sentMails:', sentMails)
    const {
      onSetFilterBySearch,
      onSetFilterBySelect,
      onSelectMail,
      onToggleBtn,
      onRemoveMail,
      onCompose,
      DynamicCmp,
      onSetFilterByAside,
    } = this
    return (
      <section className="mail-app">
        <header className="mail-app-header">
          <div className="mail-logo">mail</div>
          <MailFilter
            onSetFilterBySearch={onSetFilterBySearch}
            onSetFilterBySelect={onSetFilterBySelect}
          />
          <MailTopNavbar />
        </header>

        <aside className="mail-app-aside-filter">
          <MailFolderList
            mails={mails}
            onCompose={onCompose}
            onSetFilterByAside={onSetFilterByAside}
          />
        </aside>

        <section className="main-content-app">
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
          {isCompose && <MailCompose onCompose={onCompose} />}
          {isCompose && <MailTrash onCompose={onCompose} />}
          {isCompose && <MailSent sentMails={sentMails} />}
          {/* <DynamicCmp
            mails={mails}
            onSelectMail={onSelectMail}
            onToggleBtn={onToggleBtn}
            onRemoveMail={onRemoveMail}
          /> */}
        </section>
      </section>
    )
  }
}

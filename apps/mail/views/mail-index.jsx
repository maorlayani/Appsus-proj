const Router = ReactRouterDOM.HashRouter
const { Route, Link, Switch } = ReactRouterDOM

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
    this.onSentMails()
    console.log('this.props:', this.props)
  }

  inputRef = React.createRef()

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
    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.loadMails()
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

  onCompose = () => {
    const toggle = !this.state.isCompose
    this.setState({ isCompose: toggle })
    // this.inputRef.current.focus()
  }

  onSentMails = () => {
    console.log('hiiiiiiSenntttt')
    mailService.getSentMails().then((sentMails) => this.setState({ sentMails }))
  }

  getTypeMails = () => {
    const { sent, trash } = this.state.filterBy
    const { mails, sentMails, trashMails } = this.state
    if (sent) return sentMails
    if (trash) return trashMails
    return mails
  }

  doRenderList = () => {
    const { selectedMail, isCompose } = this.state
    const res = !selectedMail || !isCompose ? true : false
    console.log('res:', res)
    return res
  }

  render() {
    const { mails, selectedMail, isCompose, sentMails } = this.state
    const { sent, trash } = this.state.filterBy
    const { match } = this.props
    console.log('isCompose', isCompose)
    console.log('selectedMail', selectedMail)
    console.log('trash:', trash)
    const {
      onSetFilterBySearch,
      onSetFilterBySelect,
      onSelectMail,
      onToggleBtn,
      onRemoveMail,
      onCompose,
      DynamicCmp,
      onSetFilterByAside,
      onSentMails,
      onMoveTrashMail,
      onTrashMails,
      getTypeMails,
      inputRef,
      doRenderList,
    } = this
    return (
      <section className="mail-app">
        <header className="mail-app-header">
          <div
            className="mail-logo"
            onClick={() => {
              this.props.history.push('/mail')
            }}
          >
            mail
          </div>
          <MailFilter
            onSetFilterBySearch={onSetFilterBySearch}
            onSetFilterBySelect={onSetFilterBySelect}
          />
        </header>

        <aside className="mail-app-aside-filter">
          <MailFolderList
            mails={mails}
            onCompose={onCompose}
            onSetFilterByAside={onSetFilterByAside}
            onSentMails={onSentMails}
            onTrashMails={onTrashMails}
          />
        </aside>

        <Router>
          <section className="main-content-app">
            <Switch>
              <Route path="/mail/details/:mailId" component={MailDetails} />
              <Route path="/mail/compose" component={MailCompose} />
              <Route path="/mail" component={MailList} />
            </Switch>
          </section>
        </Router>
        {/* <Route path="/mail/details/:mailId"> 
              <MailDetails />
            </Route> */}

        {/* <Route exact path="/mail">
              <MailList
                mails={getTypeMails()}
                trash={trash}
                onSelectMail={onSelectMail}
                onToggleBtn={onToggleBtn}
                onRemoveMail={onRemoveMail}
                onMoveTrashMail={onMoveTrashMail}
              />
            </Route> */}

        {/* {doRenderList && (
              <MailList
                mails={getTypeMails()}
                trash={trash}
                onSelectMail={onSelectMail}
                onToggleBtn={onToggleBtn}
                onRemoveMail={onRemoveMail}
                onMoveTrashMail={onMoveTrashMail}
              />
            )} */}

        {/* {selectedMail && (
            <MailDetails
              mail={selectedMail}
              onGoBack={() => onSelectMail()}
              onRemoveMail={onRemoveMail}
            />
          )} */}
        {/* {isCompose && (
              <MailCompose onCompose={onCompose} inputRef={inputRef} />
            )} */}
        {/* </section>
        </Router> */}
      </section>
    )
  }
}

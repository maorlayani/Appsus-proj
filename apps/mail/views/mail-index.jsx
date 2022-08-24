import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailTopNavbar } from '../cmps/mail-top-navbar.jsx'

import { mailService } from '../services/mail.service.js'

export class MailIndex extends React.Component {
  state = {
    mails: [],
    filterBy: null,
  }

  componentDidMount() {
    this.loadMails()
  }

  loadMails = () => {
    console.log('hello from loadMails')
    mailService.query().then((mails) => this.setState({ mails }))
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadMails)
  }

  render() {
    const { mails } = this.state
    const { onSetFilter } = this
    return (
      <section className="mail-app">
        <h1>mail app</h1>
        <MailFilter onSetFilter={onSetFilter} />
        <MailFolderList />
        <MailList mails={mails} />
        <MailTopNavbar />
      </section>
    )
  }
}

const { Link } = ReactRouterDOM
export class MailFolderList extends React.Component {
  state = {
    filterBy: {
      starred: false,
      inbox: false,
      important: false,
      sent: false,
      trash: false,
    },
  }

  getClassCliced = (ev) => {
    console.log('target:', ev)
  }

  toggleFilter = (field) => {
    console.log('{field}:', field)
    if (field === 'sent') {
      this.props.onSentMails()
    }
    if (field === 'trash') {
      this.props.onTrashMails()
    }
    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: !prevState.filterBy[field],
        },
      }),
      () => {
        console.log('this.state.filterBy:', this.state.filterBy)
        this.props.onSetFilterByAside(field, this.state.filterBy[field])
      }
    )
  }

  getClassName = (type) => {
    const item = this.state.filterBy[type]
    const classNameItem = item
      ? `mail-folder ${type} clicked`
      : `mail-folder ${type} `
    return classNameItem
  }

  render() {
    console.log('this.props:', this.props)
    const { mails, onCompose } = this.props
    const { starred, important, inbox, sent } = this.state.filterBy

    const { toggleFilter } = this
    console.log('mails:', mails)

    return (
      <section className="mail-folder-list">
        <ul>
          <Link to={'/mail/compose'}>
            <li
              className="mail-folder compose"
              onClick={() => {
                onCompose()
              }}
            >
              <span></span>
              <span>Compose</span>
              <span></span>
            </li>
          </Link>
          {/* <li
            className="mail-folder compose"
            onClick={() => {
              onCompose()
            }}
          >
            <span></span>
            <span>Compose</span>
            <span></span>
          </li> */}
          <li
            className={this.getClassName('inbox')}
            onClick={() => {
              toggleFilter('inbox')
            }}
          >
            <span>
              <i className="fa-solid fa-inbox"></i>
            </span>
            <span> Inbox</span>
            <span></span>
          </li>
          <li
            className={this.getClassName('starred')}
            onClick={() => {
              toggleFilter('starred')
            }}
          >
            <span>
              {starred ? (
                <i
                  className="fa-solid fa-star"
                  style={{ color: 'rgb(234, 181, 7)' }}
                ></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </span>
            Starred<span></span>
            <span></span>
          </li>

          <li
            className={this.getClassName('important')}
            onClick={() => {
              toggleFilter('important')
            }}
          >
            <span>
              {important ? (
                <i
                  className="fa-solid fa-bookmark"
                  style={{ color: 'rgb(234, 181, 7)' }}
                ></i>
              ) : (
                <i className="fa-regular fa-bookmark"></i>
              )}
            </span>
            Important<span></span>
            <span></span>
          </li>

          <li
            className={this.getClassName('sent')}
            onClick={() => {
              toggleFilter('sent')
            }}
          >
            Sent<span></span>
            <span></span>
          </li>
          <li
            className={this.getClassName('trash')}
            onClick={() => {
              toggleFilter('trash')
            }}
          >
            <span>
              {' '}
              <i className="fa-regular fa-trash-can"></i>
            </span>
            Trash<span></span>
            <span></span>
          </li>
        </ul>
      </section>
    )
  }
}

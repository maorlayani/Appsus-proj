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

  render() {
    console.log('this.props:', this.props)
    const { mails, onCompose } = this.props
    const { starred, important, inbox, sent } = this.state.filterBy

    const { toggleFilter } = this
    console.log('mails:', mails)

    return (
      <section className="mail-folder-list">
        <ul>
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
          <li
            className="mail-folder inbox"
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
            className="mail-folder sent"
            onClick={() => {
              toggleFilter('sent')
            }}
          >
            Sent<span></span>
            <span></span>
          </li>
          <li
            className="mail-folder trash"
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

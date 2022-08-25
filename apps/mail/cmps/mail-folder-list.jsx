export function MailFolderList() {
  function getClassCliced(ev) {
    console.log('target:', ev)
  }

  return (
    <section className="mail-folder-list">
      <ul>
        <li
          className="mail-folder compose"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>🖊</span>Compose<span></span>
          <span></span>
        </li>
        <li
          className="mail-folder inbox"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>📂</span>Inbox<span></span>
          <span></span>
        </li>
        <li
          className="mail-folder starred"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>✩</span>Starred<span></span>
          <span></span>
        </li>
        <li
          className="mail-folder important"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>🔰</span>Important<span></span>
          <span></span>
        </li>
        <li
          className="mail-folder sent"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>➢</span>Sent<span></span>
          <span></span>
        </li>
        <li
          className="mail-folder trash"
          onClick={() => {
            getClassCliced()
          }}
        >
          <span>🗑</span>Trash<span></span>
          <span></span>
        </li>
      </ul>
    </section>
  )
}

const { Link } = ReactRouterDOM

import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails }) {
  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li className="mail-preview" key={mail.id}>
            <MailPreview mail={mail} />
            {/* <Link to={"/mail/" + mail.id}>Details</Link> | 
                <Link to={`/mail/edit/${mail.id}`}>Edit</Link> */}
          </li>
        ))}
      </ul>
    </section>
  )
}

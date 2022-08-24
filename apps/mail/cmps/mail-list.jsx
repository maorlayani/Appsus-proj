import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails }) {
  return (
    <section className="mail-list">
      <h1>From mail list!</h1>
      <MailPreview />
    </section>
  )
}

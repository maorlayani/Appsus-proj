import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
// import { dataMailService } from './data.mail.service.js'

export const mailService = {
  getById,
  query,
  remove,
  getNextEmailId,
  save,
  getSubjects,
  sentMail,
  getSentMails,
  moveToTrash,
  getTrashMail,
}

const KEY = 'emailDB'
const KEY_SENT_MAIL = 'sentMailDB'
const KEY_MAIL_TRASH = 'trashMailDB'

var gSubjects = ['All', 'Financial', 'Shoping', 'Study', 'Sport', 'Vacation']
var gSentBy = ['Wolt', 'Dropbox', 'AliExpress', 'Tel-Aviv', 'Nir-Aviv', 'Lime']

function query(filterBy) {
  let emails = _loadFromStorage(KEY)
  if (!emails || emails.length === 0) {
    emails = _createEmails()
    _saveToStorage(KEY, emails)
  }

  console.log('emails:', emails)
  if (filterBy) {
    let { subject, selected, starred, important, inbox } = filterBy
    console.log('{ subject, selected }:', {
      subject,
      selected,
      starred,
      important,
      inbox,
    })
    if (inbox) {
      return Promise.resolve(emails)
    }
    if (!subject) subject = 'All'
    if (!selected) selected = 'All'
    console.log('{ subject, selected }:', { subject, selected })

    emails = emails.filter((email) => {
      return email.subject.includes(subject) || email.sentBy.includes(subject)
    })

    if (starred && important) {
      emails = emails.filter((email) => {
        return email.starred || email.important
      })
    } else {
      if (starred) {
        emails = emails.filter((email) => email.starred)
      }
      if (important) {
        emails = emails.filter((email) => email.important)
      }
    }
  }
  console.log('emails:', emails)

  return Promise.resolve(emails)
}

function getById(emailId) {
  console.log('emailIdgetById:', emailId)
  if (!emailId) return Promise.resolve(null)
  const emails = _loadFromStorage(KEY)
  const email = emails.find((email) => emailId === email.id)
  return Promise.resolve(email)
}

function getNextEmailId(emailId) {
  let emails = _loadFromStorage(KEY)
  const emailIdx = emails.findIndex((email) => email.id === emailId)
  const nextEmailIdx = emailIdx + 1 === emails.length ? 0 : emailIdx + 1
  return emails[nextEmailIdx].id
}

function remove(emailId) {
  // return Promise.reject('Not now!!!')
  let emails = _loadFromStorage(KEY_MAIL_TRASH)
  emails = emails.filter((email) => email.id !== emailId)
  _saveToStorage(KEY_MAIL_TRASH, emails)
  return Promise.resolve()
}

function save(email) {
  if (email.id) return _update(email)
  else return _add(email)
}

function _add({ subject, body }) {
  let emails = _loadFromStorage(KEY)
  const email = _createEmail(subject, body)
  emails = [email, ...emails]
  _saveToStorage(KEY, emails)
  return Promise.resolve(email)
}

function _update(emailToUpdate) {
  let emails = _loadFromStorage(KEY)
  emails = emails.map((email) =>
    email.id === emailToUpdate.id ? emailToUpdate : email
  )
  _saveToStorage(KEY, emails)
  return Promise.resolve(emailToUpdate)
}

function getSubjects() {
  return gSubjects
}

function _getRandLabelMail(item) {
  const randNum = utilService.getRandomIntInclusive(0, gSubjects.length - 1)
  if (item === 'subject') {
    return `All ${gSubjects[randNum]}`
  } else if (item === 'sentBy') {
    return gSentBy[randNum]
  } else {
    return gSubjects[randNum]
  }
}

function _createEmail(
  subject = _getRandLabelMail('subject'),
  body = utilService.makeLorem(40),
  sentBy = _getRandLabelMail('sentBy'),
  sent = false
) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: utilService.getFormtedTime(),
    to: 'momo@momo.com',
    sentBy,
    isCheck: false,
    important: false,
    starred: false,
    sent,
  }
}

function _createEmails() {
  const emails = []
  for (let i = 0; i < 20; i++) {
    emails.push(_createEmail())
  }
  return emails
}

function _saveToStorage(KEY, emails) {
  storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage(KEY) {
  return storageService.loadFromStorage(KEY)
}

function sentMail(mail) {
  let emails = _loadFromStorage(KEY_SENT_MAIL)
  if (!emails || emails.length === 0) {
    const firstMail = _createEmail('Hello', 'first Mail', 'Messi', true)
    emails = []
    emails.push(firstMail)
  }
  const { subject, body, sentBy } = mail
  const savaMail = _createEmail(subject, body, sentBy, true)
  emails.unshift(savaMail)
  _saveToStorage(KEY_SENT_MAIL, emails)
}

function getSentMails() {
  let emails = _loadFromStorage(KEY_SENT_MAIL)
  console.log('emails:', emails)
  return Promise.resolve(emails)
}

function moveToTrash(emailId) {
  let emails = _loadFromStorage(KEY)
  const email = emails.find((email) => email.id === emailId)
  console.log('email:', email)
  saveMailInTrash(email)

  emails = emails.filter((email) => email.id !== emailId)
  _saveToStorage(KEY, emails)
  return Promise.resolve()
}

function saveMailInTrash(email) {
  console.log('saveMailInTrash')
  let emails = _loadFromStorage(KEY_MAIL_TRASH)
  console.log('emails:', emails)
  if (!emails || emails.length === 0) {
    emails = []
    emails[0] = email
  } else {
    emails.unshift(email)
  }
  console.log('emails:', emails)
  _saveToStorage(KEY_MAIL_TRASH, emails)
}

function getTrashMail() {
  console.log('getTrashMail')
  let emails = _loadFromStorage(KEY_MAIL_TRASH)
  console.log('emails:', emails)
  return Promise.resolve(emails)
}

function getSentMails() {
  let emails = _loadFromStorage(KEY_SENT_MAIL)
  console.log('emails:', emails)
  return Promise.resolve(emails)
}

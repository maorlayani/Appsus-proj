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
}

const KEY = 'emailDB'
var gSubjects = ['All', 'Financial', 'Shoping', 'Study', 'Sport', 'Vacation']
var gSentBy = ['Wolt', 'Dropbox', 'AliExpress', 'Tel-Aviv', 'Nir-Aviv', 'Lime']

function query(filterBy) {
  let emails = _loadFromStorage()
  if (!emails || emails.length === 0) {
    emails = _createEmails()
    _saveToStorage(emails)
  }

  console.log('emails:', emails)
  if (filterBy) {
    let { subject, selected } = filterBy
    console.log('{ subject, selected }:', { subject, selected })
    if (!subject) subject = 'All'
    if (!selected) selected = 'All'
    console.log('{ subject, selected }:', { subject, selected })

    emails = emails.filter((email) => {
      // console.log('email:', email)
      // console.log(`${subject}`)
      // console.log('email.subject:', email.subject)

      return email.subject.includes(subject) || email.sentBy.includes(subject)
    })
  }
  console.log('emails:', emails)

  return Promise.resolve(emails)
}

function getById(emailId) {
  if (!emailId) return Promise.resolve(null)
  const emails = _loadFromStorage()
  const email = emails.find((email) => emailId === email.id)
  return Promise.resolve(email)
}

function getNextEmailId(emailId) {
  let emails = _loadFromStorage()
  const emailIdx = emails.findIndex((email) => email.id === emailId)
  const nextEmailIdx = emailIdx + 1 === emails.length ? 0 : emailIdx + 1
  return emails[nextEmailIdx].id
}

function remove(emailId) {
  // return Promise.reject('Not now!!!')
  let emails = _loadFromStorage()
  emails = emails.filter((email) => email.id !== emailId)
  _saveToStorage(emails)
  return Promise.resolve()
}

function save(email) {
  if (email.id) return _update(email)
  else return _add(email)
}

function _add({ subject, body }) {
  let emails = _loadFromStorage()
  const email = _createEmail(subject, body)
  emails = [email, ...emails]
  _saveToStorage(emails)
  return Promise.resolve(email)
}

function _update(emailToUpdate) {
  let emails = _loadFromStorage()
  emails = emails.map((email) =>
    email.id === emailToUpdate.id ? emailToUpdate : email
  )
  _saveToStorage(emails)
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
  sentBy = _getRandLabelMail('sentBy')
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
    isImportant: false,
  }
}

function _createEmails() {
  const emails = []
  for (let i = 0; i < 10; i++) {
    emails.push(_createEmail())
  }
  return emails
}

function _saveToStorage(emails) {
  storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

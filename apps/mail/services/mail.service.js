import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
// import { dataMailService } from './data.mail.service.js'

export const mailService = {
  getById,
  query,
  remove,
  getNextEmailId,
  save,
}

const KEY = 'emailDB'
// var gVendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']

//TODO : function query(filterBy)
function query() {
  let emails = _loadFromStorage()
  if (!emails) {
    emails = _createEmails()
    _saveToStorage(emails)
  }

  // if (filterBy) {
  //     let { vendor, minSpeed, maxSpeed } = filterBy
  //     if (!minSpeed) minSpeed = 0;
  //     if (!maxSpeed) maxSpeed = Infinity
  //     emails = emails.filter(car => (
  //         car.vendor.includes(vendor) &&
  //         car.speed >= minSpeed &&
  //         car.speed <= maxSpeed
  //     ))
  // }

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

// function getVendors() {
//     return gVendors
// }

function _createEmail(
  subject = utilService.makeLorem(5),
  body = utilService.makeLorem(40)
) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
    to: 'momo@momo.com',
  }
}

function _createEmails() {
  const emails = []
  for (let i = 0; i < 6; i++) {
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

import moment from 'moment'

export const isFieldRequired = value =>
  value ? undefined : 'This Field is Required.'

export const ucFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const padStart = (num, digits = 2) =>
  num.toString().padStart(digits, '0')

export const hhmmss = (secs) => {
  let minutes = Math.floor(secs / 60)
  secs = secs % 60
  var hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  return (hours ? padStart(hours) + ':' : '') +
    (minutes ? padStart(minutes) + ':' : '') +
    padStart(secs)
}

export const distanceUnit = (distance, suffix = '') =>
  distance < 1000
  ? Math.round(distance * 10) / 10 + ' m' + suffix
  : Math.round(distance / 100) / 10 + ' km' + suffix

export const getDateStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD') : undefined

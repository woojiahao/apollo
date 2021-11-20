const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function getMonth(month: number) {
  if (month > months.length - 1) return null
  return months[month]
}
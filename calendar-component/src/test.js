const dayjs = require('dayjs')

console.log(dayjs('2024-02-18').daysInMonth()) // 29

console.log(dayjs('2024-02-18').startOf('month').format('YYYY-MM-DD')) // 2024-02-01

console.log(dayjs('2024-02-18').endOf('month').format('YYYY-MM-DD')) // 2024-02-29
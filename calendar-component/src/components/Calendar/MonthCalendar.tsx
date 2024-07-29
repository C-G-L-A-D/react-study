import { Dayjs } from 'dayjs'
import { CalendarProps } from './index'

interface MonthCalendarProps extends CalendarProps {
 
}

/**
 * 根据指定日期获取当前日历信息
 * @param date 日期
 * @returns 当前日历信息
 */
function getAllDays(date: Dayjs) {
    const startDate = date.startOf('month')
    const day = startDate.day()

    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7)

    for(let i = 0; i < day; i++) {
        // 通过 subtract 函数计算上个月的日期
        daysInfo[i] = {
            date: startDate.subtract(day - i, 'day'),
            currentMonth: false
        }
    }

    for(let i = day; i < daysInfo.length; i++) {
        // 通过 add 函数计算当月及下个月的日期
        const calcDate = startDate.add(i - day, 'day');
        daysInfo[i] = {
            date: calcDate,
            currentMonth: calcDate.month() === date.month()
        }
    }

    return daysInfo
}

function renderDays(days: Array<{date: Dayjs, currentMonth: boolean}>) {
    const rows = [];
    
    for(let i = 0; i < 6; i++) {
        const row = []
        for(let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            row[j] = <div className="calendar-month-body-cell">
                {item.date.date()}
            </div>
        }
        rows.push(row)
    }

    return rows.map(row => <div className="calendar-month-body-row">
        {row}
    </div>)
}

function MonthCalendar(props: MonthCalendarProps) {
    const { value } = props

    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    // 获取当月日历
    const allDays = getAllDays(value)

    return  <div className="calendar-month">
        <div className="calendar-month-week-list">
            {
                weekList.map((item, index) => {
                    return <div className="calendar-month-week-list-item" key={item}>
                        {item}
                    </div>
                })
            }
        </div>
        <div className="calendar-month-body">
            {renderDays(allDays)}
        </div>
    </div>
}

export default MonthCalendar
import { Dayjs } from 'dayjs'
import { CalendarProps } from './index'
import { ReactNode, useContext } from 'react';
import cs from 'classnames';
import LocaleContext from './LocaleContext';
import allLocales from './locale';

// 子组件继承父组件的传参
interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void
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

/**
 * 渲染日历表格样式（根据每行进行渲染）
 * @param days 日历信息
 * @returns 日历组件显示
 */
function renderDays(
    days: Array<{date: Dayjs, currentMonth: boolean}>,
    value: Dayjs,
    dateRender?: MonthCalendarProps['dateRender'],
    dateInnerContent?: MonthCalendarProps['dateInnerContent'],
    selectHandler?: MonthCalendarProps['selectHandler']
) {
    const rows = [];

    for(let i = 0; i < 6; i++) {
        const row = []
        for(let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            // 设置每个日期的样式，并兼容外部配置
            row[j] = (
                <div
                key={item.date.format('YYYY-MM-DD')}
                onClick={() => selectHandler?.(item.date)}
                className={
                    "calendar-month-body-cell" +
                        (item.currentMonth ? 
                            ' calendar-month-body-cell-current' : '')
                }>
                    {
                        dateRender ? dateRender(item.date) : (
                            <div className="calendar-month-body-cell-date">
                                <div className={
                                    cs("calendar-month-body-cell-date-value",
                                        value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                            ? 'calendar-month-body-cell-date-selected' : ''
                                    )
                                }>
                                    {item.date.date()}
                                </div>
                                <div className="calendar-month-body-cell-date-content">
                                    {dateInnerContent?.(item.date)}
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }
        rows.push(row)
    }

    return rows.map((row, index) => <div className="calendar-month-body-row" key={index}>
        {row}
    </div>)
}

function MonthCalendar(props: MonthCalendarProps) {
    const { value, dateRender, dateInnerContent, selectHandler } = props

    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    
    const localeContext = useContext(LocaleContext)
    // 获取当前语言信息
    const CalendarLocale = allLocales[localeContext.locale]

    // 获取当月日历
    const allDays = getAllDays(value)

    return  <div className="calendar-month">
        <div className="calendar-month-week-list">
            {
                weekList.map((item, index) => {
                    return <div className="calendar-month-week-list-item" key={item}>
                        {CalendarLocale.week[item]}
                    </div>
                })
            }
        </div>
        <div className="calendar-month-body">
            {renderDays(allDays, value, dateRender, dateInnerContent, selectHandler)}
        </div>
    </div>
}

export default MonthCalendar
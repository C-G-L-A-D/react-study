import { forwardRef, useImperativeHandle } from 'react'
import style from './index.module.css'
import { useControllableValue } from 'ahooks'

interface CalendarProps {
    defaultValue?: Date,
    onChange?: (date: Date) => void
}

// 通过 ref 暴露 Calendar 组件的 api
export interface CalendarRef {
    getDate: () => Date,
    setDate: (date: Date) => void
}


const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> =  (props, ref) => {


    // 记录当前日期(兼容受控和非受控模式)
    const [date, setDate] = useControllableValue(props, {
        defaultValue: new Date()
    })

    /**
     * 通过 new Date(year, month, day) 创建 Date 对象，此时 Date 对象 的日期为 year年month-1月day日
     * 月份 > 12 或 月份 <= 0 时，new Date 会自动更新年份创建对应日期
     * 通过 
     * 通过 getMonth() 方法获取当前月份时，返回月份数字从 0 开始
     * 通过 getDay() 方法可以计算当前是星期几
     */
    

    // useImperativeHandle 用于重新自定义 ref 对象
    useImperativeHandle(ref, () => {
        return {
            getDate: () => date,
            setDate: (date: Date) => { setDate(date) }
        }
    })

    // 月份名称
    const monthName = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二'
    ]

    // 切换上一个月份的 第一天
    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }

    // 切换下一个月份的 第一天
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    // 获取指定月份的天数（ month从 0 开始 ）
    const daysOfMonth = (year: number, month: number) => {
        // new Date(year, month + 1, 1) 代表 year 年 month + 1 月 1 日
        // new Date(year, month + 1, 0) 代表 year 年 month 月 的最后一天
        // new Date(year, month + 1, -1) 代表 year 年 month 月 的倒数第二天
        // 通过 getDate() 方法可以获取当天的日期
        // 因为天数从 1 开始，所以 new Date(year, month + 1, 0).getDate() 也表示获取 year 年 month 月 的天数
        return new Date(year, month + 1, 0).getDate()
    }

    // 计算指定月份的第一天是星期几（ month从 0 开始 ）
    const firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const clickHandler = (val: Date) => {
        // ahooks 的 useControllableValue 将 setDate 进行二次封装，自动触发 onChange 事件
        setDate(val)
    }

    // 获取当前显示的日历信息
    const renderDates = () => {
        const days = []

        // 获取天数
        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
        // 获取指定年月第一天是星期几
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

        const daysCountOnLastMonth = daysOfMonth(date.getFullYear(), date.getMonth() - 1)

        // 补充上一个月的日期
        for(let i = 0; i < firstDay; i++) {
            const curDate = new Date(date.getFullYear(), date.getMonth() - 1, daysCountOnLastMonth - firstDay + i + 1)
            days.push({ date: curDate, type: 'last' })
        }
        // 补充当月的日期
        for(let i = 1; i <= daysCount; i++) {
            const curDate = new Date(date.getFullYear(), date.getMonth(), i)
            days.push({ date: curDate, type: 'current' })
        }
        // 补充下一个月的日期
        const curLen = days.length
        for(let i = 1; i <= 6 * 7 - curLen; i++) {
            const curDate = new Date(date.getFullYear(), date.getMonth() + 1, i)
            days.push({ date: curDate, type: 'next' })
        }

        // 根据日历创建元素
        const dayElements = days.map(item => {
            let className = [style.day]
            if(item.type === 'last') {
                className.push(style['last-month'])
            } else if(item.type === 'next') {
                className.push(style['next-month'])
            } else {
                if(item.date.getDate() === date.getDate()) {
                    className.push(style['selected'])
                }
            }

            return (
                <div 
                    className={className.join(' ')}
                    key={ item.date.toLocaleDateString() }
                    onClick={() => {
                        console.log(item.date.toLocaleDateString(), item.type)
                        clickHandler(item.date)
                    }}
                >
                    { item.date.getDate() }
                </div>
            )
        })
        return {
            days,
            dayElements
        }
    }

    const { dayElements } = renderDates()

    return <div className={style.calendar}>
        <div className={style.header}>
            <button onClick={handlePrevMonth}>&lt;</button>
            <div> { date.getFullYear() } 年 { monthName[date.getMonth()] } 月</div>
            <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className={style.days}>
            <div className={style.day}>日</div>
            <div className={style.day}>一</div>
            <div className={style.day}>二</div>
            <div className={style.day}>三</div>
            <div className={style.day}>四</div>
            <div className={style.day}>五</div>
            <div className={style.day}>六</div>
            { dayElements }
        </div>
    </div>
}

export default forwardRef(Calendar)
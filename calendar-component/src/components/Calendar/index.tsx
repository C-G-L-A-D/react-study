import dayjs, { Dayjs, locale } from 'dayjs';
import './index.scss';
import MonthCalendar from './MonthCalendar';
import Header from './Header';
import { CSSProperties, ReactNode, useState } from 'react';
import cs from 'classnames';
import LocaleContext from './LocaleContext';

export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    // 定制日期显示
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {

    const { value, style, className, locale, onChange } = props

    // 使用 classnames 依赖库来合并类名
    const classNames = cs("calendar", className)

    /**
     * 修改日期（抽离逻辑）
     * @param date 待修改日期
     */
    function changeData(date: Dayjs) {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }

    // 当前日期状态管理
    const [curValue, setCurValue] = useState<Dayjs>(value)
    function selectHandler(date: Dayjs) {
        changeData(date)
    }

    const [curMonth, setCurMonth] = useState<Dayjs>(value)
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, 'month'))
    }
    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, 'month'))
    }
    function todayHandler() {
        const date = dayjs(Date.now())

        changeData(date)
    }

    return <LocaleContext.Provider value={{locale: locale || navigator.language}}>
        <div className={classNames} style={style}>
            <Header curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} todayHandler={todayHandler}/>
            <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
        </div>
    </LocaleContext.Provider>
}

export default Calendar
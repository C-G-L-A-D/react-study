import { useContext } from "react";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import { Dayjs } from "dayjs";

interface HeaderProps {
    curMonth: Dayjs;
    prevMonthHandler: () => void;
    nextMonthHandler: () => void;
}

function Header() {
    const localeContext = useContext(LocaleContext)
    const CalendarLocale = allLocales[localeContext.locale]
    return (
        <div className="calendar-header">
            <div className="calendar-header-left">
                <div className="calendar-header-icon">&lt;</div>
                <div className="calendar-header-value">2023 年 11月</div>
                <div className="calendar-header-icon">&gt;</div>
                <div className="calendar-header-btn">
                    { CalendarLocale.today }
                </div>
            </div>
        </div>
    )
}

export default Header;
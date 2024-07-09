import { useState } from 'react'
import style from './index.module.css'

function Calendar() {

    const [date, setDate] = useState(new Date())

    // 切换上一个月份的 第一天
    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }

    // 切换下一个月份的 第一天
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    console.log(date.toLocaleDateString(), '当前日期')

    return <div className={style.calendar}>
        <div className={style.header}>
            <button onClick={handlePrevMonth}>&lt;</button>
            <div>2024 年 7 月</div>
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
            <div className={style.empty}></div>
            <div className={style.empty}></div>
            <div className={style.day}>1</div>
            <div className={style.day}>2</div>
            <div className={style.day}>3</div>
            <div className={style.day}>4</div>
            <div className={style.day}>5</div>
            <div className={style.day}>6</div>
            <div className={style.day}>7</div>
            <div className={style.day}>8</div>
            <div className={style.day}>9</div>
            <div className={style.day}>10</div>
            <div className={style.day}>11</div>
            <div className={style.day}>12</div>
            <div className={style.day}>13</div>
            <div className={style.day}>14</div>
            <div className={style.day}>15</div>
            <div className={style.day}>16</div>
            <div className={style.day}>17</div>
            <div className={style.day}>18</div>
            <div className={style.day}>19</div>
            <div className={style.day}>20</div>
            <div className={style.day}>21</div>
            <div className={style.day}>22</div>
            <div className={style.day}>23</div>
            <div className={style.day}>24</div>
            <div className={style.day}>25</div>
            <div className={style.day}>26</div>
            <div className={style.day}>27</div>
            <div className={style.day}>28</div>
            <div className={style.day}>29</div>
            <div className={style.day}>30</div>
        </div>
    </div>
}

export default Calendar
// 非受控
import { useState } from "react";


// 定义组件参数类型
interface CalendarProps {
    defaultValue?: Date;
    onChange?: (date: Date) => void
}


function Calendar(props: CalendarProps) {
    const { defaultValue = new Date(), onChange } = props

    const [value, setValue] = useState(defaultValue)

    function changeValue(date: Date) {
        // 更新值
        setValue(date)
        // 触发变更事件
        onChange && onChange(date)
    }

    

    return (
        <div>
            {value.toLocaleDateString()}
            <div onClick={() => {changeValue(new Date('2024-5-1'))}}>2024-5-1</div>
            <div onClick={() => {changeValue(new Date('2024-5-2'))}}>2024-5-2</div>
            <div onClick={() => {changeValue(new Date('2024-5-3'))}}>2024-5-3</div>
        </div>
    )
}

export default Calendar
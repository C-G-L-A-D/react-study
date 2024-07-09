// 受控

interface CalendarProps {
    value: Date;
    onChange: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
    const { value, onChange } = props;

    function changeValue(date: Date) {
        onChange && onChange(date)
    }
    

    return (
        <div>
            { value.toLocaleDateString() }
            <div onClick={() => changeValue(new Date('2024-5-1'))}>2024-5-1</div>
            <div onClick={() => changeValue(new Date('2024-5-2'))}>2024-5-2</div>
            <div onClick={() => changeValue(new Date('2024-5-3'))}>2024-5-3</div>
        </div>
    )

}

export default Calendar 
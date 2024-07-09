import { useEffect, useRef, useState } from "react"
import useMergeState from "../../hooks/useMergeState";

interface CalendarProps{
  value?: Date; // 外部传入受控值（受控）
  defaultValue?: Date; // 内部默认状态（非受控）
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  
  // 外部传入的受控值重命名为 propsValue。初始化默认值
  const { value: propsValue, defaultValue, onChange } = props;


  // 当前组件状态兼容受控和非受控模式（使用封装后的hook）
  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  })

  /* useMergeState 等同于
    // 通过 value 区分受控模式和非受控模式
    const [value, setValue] = useState(() => {
      // 获取初始值
      if (propsValue !== undefined) {
        // 外部传入
        return propsValue;
      } else {
        // 默认值
        return defaultValue;
      }
    });
    
    const isFirstRender = useRef(true);

    useEffect(() => {
      if(propsValue === undefined && !isFirstRender.current) {
        // 重新渲染时，将受控组件转换为非受控组件
        setValue(propsValue);
      }
      isFirstRender.current = false;
    }, [propsValue]);

    // 非受控模式 使用内部状态，受控模式使用 受控值
    const mergedValue = propsValue === undefined ? value : propsValue;

    function changeValue(date: Date) {
      if (propsValue === undefined) {
        // 非受控模式，内部更新值
        setValue(date);
      }
      onChange?.(date);
    } 
  */

  

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={()=> {setValue(new Date('2024-5-1'))}}>2024-5-1</div>
    <div onClick={()=> {setValue(new Date('2024-5-2'))}}>2024-5-2</div>
    <div onClick={()=> {setValue(new Date('2024-5-3'))}}>2024-5-3</div>
  </div>
}


export default Calendar

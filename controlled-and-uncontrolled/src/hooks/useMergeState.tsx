import { useRef, useState, useEffect, useCallback, SetStateAction } from 'react'

/**
 * @description 用于兼容受控和非受控模式
 * @author luo ad
 * @date 2024-07-09
 */
function useMergeState<T>(
    defaultStateValue: T,
    props?: {
        defaultValue?: T,
        value?: T,
        onChange?: (value: T) => void
    }
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const { defaultValue, value: propsValue, onChange} = props || {}

    // 内部状态记录
    const [stateValue, setStateValue] = useState<T>(() => {
        // 获取初始值
        if (propsValue !== undefined) {
            // 受控模式，返回受控值
            return propsValue!;
          } else if(defaultValue !== undefined){
            // 非受控模式，返回外部传入的默认值
            return defaultValue!;
          } else {
            // 非受控模式，返回内部默认值
            return defaultStateValue;
          }
    })

    // 用于标记是否为首次渲染（使用 ref 可以避免更改状态时触发重渲染）
    const isFirstRender = useRef(true)

    // 监听 propsValue 的变化来更新状态
    useEffect(() => {
        if(propsValue === undefined && !isFirstRender.current) {
            // 切换非受控模式，更新状态引起重渲染
            setStateValue(propsValue!)
        }
        
        // 更新标记
        isFirstRender.current = false
    }, [propsValue])

    // 判断是否是函数
    function isFunction(value: unknown): value is ( arg0: T) => void {
        return typeof value === 'function';
      }

    // 封装状态的 set 方法，在修改状态时触发 onChange 事件
    const setState = useCallback((value: SetStateAction<T>) => {
        const res = isFunction(value) ? value(stateValue) : value

        if(propsValue === undefined) {
            // 非受控模式，更新内部状态
            setStateValue(res)
        }
        onChange?.(res)
    }, [ stateValue ])


    // 最终状态。非受控时使用内部维护状态，受控时使用外部维护状态
    const mergedValue = propsValue === undefined ? stateValue : propsValue
    return [mergedValue, setState]
}

export default useMergeState
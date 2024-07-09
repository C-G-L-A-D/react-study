import { useRef, useState, useEffect, useCallback, SetStateAction } from 'react'
import usePrevious from './usePrevious'
/**
 * @description 用于兼容受控和非受控模式
 * @author luo ad
 * @date 2024-07-09
 */
function useMergeState<T>(
    defaultStateValue: T, // 内部默认值
    props?: {
        defaultValue?: T, // 外部传入的默认值
        value?: T, // 外部传入的受控值
        onChange?: (value: T) => void // 状态变化时触发
    }
): [T, React.Dispatch<React.SetStateAction<T>>] {
    // 接收 onChange 事件
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

    // react18 严格模式下 useEffect 执行两次，存储旧的 propsValue 来避免更新状态导致丢失 defaultValue
    const prevPropsValue = usePrevious(propsValue)

    // 首次渲染后切换为非受控模式，需要更新内部状态值
    useEffect(() => {
        // 更新标记，且首次渲染无需重新赋值
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        // 切换非受控模式后，更新内部状态。
        if(propsValue === undefined && prevPropsValue !== propsValue) {
            // 更新状态引起重渲染
            setStateValue(propsValue!)
        }
        
    }, [propsValue])

    // 判断是否是函数
    function isFunction(value: unknown): value is ( arg0: T) => void {
        return typeof value === 'function';
      }

    // 封装状态的 set 方法，在修改状态时触发 onChange 事件
    const setState = useCallback((value: SetStateAction<T>) => {
        const res = isFunction(value) ? value(stateValue) : value

        if(propsValue === undefined) {
            // 非受控模式，手动更新内部状态
            setStateValue(res)
        }
        onChange?.(res)
    }, [ stateValue ])


    // 最终状态。非受控时使用内部维护状态，受控时使用外部维护状态
    const mergedValue = propsValue === undefined ? stateValue : propsValue

    // 将更新状态方法替换为二次封装的 setState 方法
    return [mergedValue, setState]
}

export default useMergeState
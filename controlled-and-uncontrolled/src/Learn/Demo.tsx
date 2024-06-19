import { ChangeEvent, ChangeEventHandler, useRef, useEffect, useState } from 'react'

function Demo() {
  const [value, setValue] = useState('dfsd')

  console.log('render....')

  // 1. 通过 change 事件获取输入框的值
  const onChange1: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value, '通过 change 事件获取输入框的值')
  }
  const onChange2: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, '通过 change 事件获取输入框的值')
    setValue(event.target.value)
  }

  // 2. 通过 ref 获取输入框的值
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setTimeout(() => {
      console.log(ref.current?.value, '通过 ref 获取输入框的值')
    }, 2000)
  }, [value])

  // 属性 defaultValue 可设置输入框的初始值
  return (
    <>
      <p>非受控模式</p>
      <input defaultValue={'323'} type='text' onChange={onChange1} ref={ref} />
      <br />
      <p>
        使用代码 onChage 事件将 input 元素修改为受控模式，但同时修改数据时会导致 App 组件多次重渲染
      </p>
      <input value={value} type='text' onChange={onChange2} />
      <br />
      <form></form>
    </>
  )
}

export default Demo

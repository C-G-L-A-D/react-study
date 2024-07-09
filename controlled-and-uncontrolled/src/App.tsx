import { useState } from 'react'
import Calendar from './components/Calendar/index'

function App() {

  const [value, setValue] = useState(new Date('2024-5-1'))

  console.log('是否重新渲染', '在触发受控组件时，当前组件会重新渲染；在触发非受控组件时，当前组件不会重新渲染')

  return <div>
    {/* 非受控组件，用户不能直接修改 value，维护的 value 值在组件内部 */}
    <Calendar defaultValue={new Date('2024-5-1')} onChange={(date) => {
      console.log(date.toLocaleDateString())
    }}/>

    {/* 受控组件，用户可以直接修改 value， 维护的 value 值在调用方 */}
    <Calendar value={value} onChange={(date) => {
      setValue(date)
      console.log(date.toLocaleDateString())
    }} />
  </div>
}

export default App
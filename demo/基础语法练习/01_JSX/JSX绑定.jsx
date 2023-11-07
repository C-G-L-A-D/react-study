export default function JsxBanding() {
  function foo() {
    console.log('foo', this)
  }

  const foo1 = () => {
    console.log('foo', this)
  }
  return (
    // 空标签可以代替为组件根标签「渲染时会删除」，避免组件多嵌套一个无用的标签
    <>
      <button onClick={foo}>点击测试jsx绑定事件</button>
      <button onClick={foo1}>点击测试jsx绑定事件</button>
      <button onClick={() => foo()}>点击测试jsx绑定事件</button>
    </>
  )
}

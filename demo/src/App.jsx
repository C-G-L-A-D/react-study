import { Component } from 'react'
import JSX_ONE from './01_JSX/index.jsx'
import LifeCycle from './LifeCycle/index.jsx'
import IntercomponentCommunication from './IntercomponentCommunication'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true
    }
  }

  handleUnmount() {
    this.setState({
      isShow: false
    })
  }

  render() {
    const { isShow } = this.state
    return (
      <>
        <JSX_ONE />
        <div>
          <button onClick={() => this.handleUnmount()}>卸载生命周期内容组件</button>
        </div>
        {isShow && <LifeCycle></LifeCycle>}
        <IntercomponentCommunication />
      </>
    )
  }
}

export default App

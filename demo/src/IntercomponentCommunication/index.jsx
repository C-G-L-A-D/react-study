import React, { Component } from 'react'

export default class Tearcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stus: ['xxx', 'yyy', 'zzz']
    }
  }

  // 通过props传递函数，获取子组件中的数据 count
  onCall(stuName, count) {
    console.log(`${stuName} 呼叫了 ${count} 次`)
  }

  render() {
    return (
      <>
        <div>Tearcher</div>
        {this.state.stus.map((item, index) => {
          return (
            <Student
              name={item}
              key={index}
              onCall={(stuName, count) => this.onCall(stuName, count)}
            />
          )
        })}
      </>
    )
  }
}

export class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  callTearcher() {
    this.setState({
      count: this.state.count + 1
    })
    this.props.onCall(this.props.name, this.state.count)
  }

  render() {
    return (
      <>
        <div>
          Student - <button onClick={() => this.callTearcher()}>呼叫老师</button>
        </div>
        <div>
          {this.props.name} - 呼叫次数 {this.state.count}
        </div>
      </>
    )
  }
}

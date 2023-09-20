import React, { Component } from 'react'
import ThemeContext from './context/theme-context'

export default class Tearcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stus: ['xxx', 'yyy', 'zzz'],
      info: {
        tchName: 'hhh',
        age: 30
      }
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
        <Subject />
        {this.state.stus.map((item, index) => {
          return (
            <Student
              {...this.state.info}
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
    // 获取解构赋值的传递参数
    console.log(props.tchName, props.age)
  }

  callTearcher() {
    this.setState({
      count: this.state.count + 1
    })
    this.props.onCall(this.props.name, this.state.count)
  }

  render() {
    console.log(this.context)
    return (
      <>
        <div style={this.context}>
          Student - <button onClick={() => this.callTearcher()}>呼叫老师</button>
        </div>
        <div>
          {this.props.name} - 呼叫次数 {this.state.count}
        </div>
      </>
    )
  }
}

// 获取指定 context 接收祖父组件传递的参数
Student.contextType = ThemeContext

// 函数式组件通过 ThemeContext.Consumer 组件中的回调函数获取传递参数
export function Subject() {
  return (
    <>
      <ThemeContext.Consumer>
        {value => {
          return <div style={value}>正在上英语课</div>
        }}
      </ThemeContext.Consumer>
    </>
  )
}

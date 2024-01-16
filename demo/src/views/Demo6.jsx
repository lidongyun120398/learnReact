import React from "react"
import { flushSync } from "react-dom"

/*
  this.setState((prevState) => {})
    + prevState存储的是之前状态的值
    + return的对象就是我们想要修改的新状态值，支持修改部分状态
    return{

    }
*/

class Demo extends React.Component{
  state = {
    x:0,
  }
  
  handle = () => {
    for(let i = 0; i < 20; i++){
      //只更新一次，结果是1
      // this.setState({
      //   x: this.state.x + 1
      // })

      //更新20次，结果是20
      // this.setState({
      //      x: this.state.x + 1
      // })
      // flushSync()

      //更新一次，结果是20
      this.setState(prevState => {
        return {
          x: prevState.x + 1
        }
      })
    }
  }
     
  render(){
    let { x } = this.state
    return <div>
        x:{x}
        <br />
        <button onClick={this.handle}>增加</button>
    </div>
  }

  
}

export default Demo
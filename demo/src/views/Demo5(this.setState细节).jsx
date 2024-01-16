import React from "react"
import { flushSync } from "react-dom"
//flushSync:刷新updater更新队列，也就是让修改状态的任务立即批处理一次

/*
  this.setState([partialState,callback])
    [partialStete]:支持部分状态更改
    [callback]:在状态更改/视图更新完毕后触发执行(也可以说只要执行了setState，callback一定会执行)
      + 发生在componentDidUpdate周期函数之后，DidUpdate会在任何状态更改后都触发执行；而回调函数方式，可以在指定状态更新后处理一些事情
      + 特殊:即便我们基于shouldComponentUpdate阻止了状态/视图的更新，DidUpdate周期函数肯定不会执行了，但是我们设置的这个callback回调函数依然会被触发执行
      类似于Vue框架中的nextTick
    在React18中,setState在任何地方执行,都是异步操作
      + React18中有一套更新队列(updater)的机制,基于异步操作,实现状态的"批处理"
      + 在当前相同时间段内(浏览器此时可以处理的事情中),遇到setStateh会立即放入到更新队列中
      + 此时状态/视图还未更新,当所有代码操作结束,会刷新队列(通知更新队列中的任务执行),把所有setState合并在一起执行,只触发一次视图更新
      + 好处: 减少视图更新的次数,降低渲染消耗的性能;让更新的逻辑和流程更清晰稳定

    在产生的私有上下文中,代码自上而下的执行
      @1 会把所有的setState操作,先加入到更新队列(只对当前上下文,同步要做的事情做处理)
      @2 当上下文中的代码都处理完毕后,会让更新队列中的任务,统一渲染/更新一次(批处理)
*/

class Demo extends React.Component{
  state = {
    x:10,
    y:5,
    z:0
  }
  
  // handle = () => {
  //   let {x,y,z} = this.state
  //   this.setState({
  //     x:100
  //   },() => {
  //     console.log("更新完毕")
  //   })
  // }

  handle = () => {
    let {x,y,z} = this.state
    // this.setState({x:x+1})
    // this.setState({y:y+1})
    // console.log(this.state)

    // setTimeout(() => {
    //   this.setState({x:x+1})
    //   console.log(this.state)
    // },1000)
    // setTimeout(() => {
    //   this.setState({y:y+1})
    //   console.log(this.state)
    // },2000)
    // setTimeout(() => {
    //   this.setState({z:z+1})
    //   console.log(this.state)
    // },3000)

    // //同时修改三个状态值,只会触发一次视图更新
    // this.setState({
    //   x:x+1,
    //   y:y+1,
    //   z:z+1
    // })

    //先修改xy，再修改z
    flushSync(() => {
      this.setState({x:x+1})
      this.setState({y:y+1})
    })
    console.log(this.state)
    this.setState({z: this.state.x + this.state.y})
  }

  render(){
    console.log("视图渲染:RENDER")
    let {x,y,z} = this.state
    return <div>
        x:{x}-y:{y}-z:{z}
        <br />
        <button onClick={this.handle}>更改状态</button>
    </div>
  }

  // shouldComponentUpdate(){
  //   return false
  // }

  // componentDidUpdate(){
  //   console.log("更新完毕")
  // }
}

export default Demo
import React from "react"

/*
  PureComponent 和 Component 的区别:
    PureComponent会默认给类组件加一个shouldComponentUpdate周期函数
      + 再次周期函数中，会对新老的的属性/状态，会做一个浅比较
      + 如果经过浅比较，发现属性和状态并没有改变，则会返回false(也就是不继续更新组件)，有变化才会去更新
*/

class Demo extends React.PureComponent{
  state = {
    arr: [10, 20, 30]
  } 

  render(){
    let { arr } = this.state
    return <div>
      {arr.map((item,index) => {
        return <p key={index} style={{
          display:'inline-block',
          width:100,
          height:100,
          backgroundColor:"pink",
          marginRight:10
        }}>
          {item}
          </p>
      })}
      <br />
      <button onClick={() => {
        arr.push(arr[arr.length - 1] + 10)
        this.setState({
          arr
        })
      }}>
        新增
      </button>
    </div>
  }
}

export default Demo
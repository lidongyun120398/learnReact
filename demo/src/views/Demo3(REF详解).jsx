import React from "react"


/* 
  受控组件:基于修改数据/状态，让视图更新，达到需要的效果
  非受控组件:基于ref获取DOM元素，操作DOM元素，来实现需求和效果

  基于ref获取DOM元素的语法
  1. 给需要的元素设置ref="xxx",后期基于this.refs.xxx去获取相应的DOM元素(目前不推荐使用:在React.StrictMode下会报错)

  2. 把ref属性值设置为一个函数
    ref={x => this.box2 = x}
    + x是一个形参：存储的是当前DOM元素
    + 然后把获取到的DOM元素"x"直接挂载到实例的某个属性上(box2)
    + 获取：this.box2

  3.基于React.createRef()，创建一个ref对象 this.xxx = {current:null} ，让ref={REF对象}
    this.xxx = React.createRef();
    + 获取：this.xxx.current

  原理：在render渲染的时候，会获取virtualDOM的ref属性
      + 如果属性值是一个字符串，则会给this.refs增加这样一个成员，成员值就是当前的DOM元素
      + 如果属性值是一个函数，则会把函数执行，把当前DOM元素传递给这个函数，而在函数执行的内部，我们一般都会把DOM元素直接挂载到实例的某个属性上
      + 如果属性值是一个REF对象，则会把DOM元素赋值给对象的current属性

*/


class Demo extends React.Component{
  box3 = React.createRef();

  render(){
    return <div>
      <h2 className="title" ref="titleBox">温馨提示</h2>
      <h2 className="title" ref={x => this.box2 = x}>友情提示</h2>
      <h2 className="title" ref={this.box3}>郑重提示</h2>
    </div>
  }

  componentDidMount(){
    // console.log(document.querySelector(".title"))
    // console.log(this.refs.titleBox)
    // console.log(this.box2)
    console.log(this.box3.current)
  }
}

export default Demo
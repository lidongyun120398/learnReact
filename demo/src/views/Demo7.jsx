import React from "react"

class Demo extends React.Component{

  //基于React内部的处理，如果我们给合成事件绑定一个普通函数，当事件行为触发，绑定函数执行，方法中的this会是undefined

  /*
    合成事件对象 SyntheticBaseEvent: 我们在React合成事件触发的时候，也可以获取到事件对象，只不过此对象是合成事件对象(React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象)

    合成事件对象中，也包含了浏览器内置事件对象中的一些属性和方法;nativeEvent:基于这个属性也可以获取浏览器内置原生的事件对象
  */
  handle(){
    //只要方法经过bind处理了，那么最后一个实参就是传递的合成事件对象
    console.log(this)//undefined
  }

  handle2 = (ev) => {
    console.log(ev)//SyntheticBaseEvent 合成事件对象，React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象
  }

  handle3 = (x,ev) => {
    console.log(x,ev)
  }

  render(){
    /*
      bind在React事件绑定中的运用：
        + 绑定的方法是一个普通函数，需要改变函数中的this是实例，此时需要用到bind
        + 想给函数传递指定的实参，可以基于bind预先处理(bind会把事件对象作为最后一个实参传递给函数)
    */
    return <div>
        <button onClick={this.handle.bind(this)}>按钮</button>
        <button onClick={this.handle2}>按钮2</button>
        <button onClick={this.handle3.bind(10)}>按钮3</button>
    </div>
  }

  
}

export default Demo
/* 
  React高阶组件:利用JS中的闭包(柯里化函数)实现的组件代理
      我们可以在代理组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方法，传递给我们最终要渲染的组件
*/
import React from "react";

const Demo = function Demo(props){
  console.log('Demo中的属性:',props)
  return <div className="demo">
    我是Demo
  </div>
}

//执行ProxyTest方法，传递一个组件进来
const ProxyTest = function ProxyTest(Component){
  //Component -> Demo
  //HOC:higher-order-components
  return function HOC(props){
    console.log(props)
    //真实要渲染的是Demo组件:把获取的props传递给Demo
    return <Component {...props}/>
  }
} 

export default ProxyTest(Demo)//把函数执行的返回结果(应该是一个组件)，基于ES6Moudle规范的导出，供App导入使用
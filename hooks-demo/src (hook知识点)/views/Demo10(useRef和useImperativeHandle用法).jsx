import React, { useState, useEffect, useLayoutEffect,useRef,useImperativeHandle } from 'react'
import { Button } from 'antd'

// 基于ref获取子组件的实例，这样基于实例，就可以调用子组件内部，挂载到实例上的东西
// class Child extends React.Component{
//   state={x: 1000}

//   render(){
//     return <div className="child-box">
//       {this.state.x}
//     </div>
//   }
// }

//基于forwardRef实现ref转发，目的：获取子组件内部的某个元素
//需求：基于forwardRef实现ref转发的同时，获取函数子组件内部的状态和方法 => useImperativeHandle
const Child = React.forwardRef(function Child(props,ref){
  const [text,setText] = useState('你好世界')
  const submit = () => {}

  useImperativeHandle(ref,() => {
    //在这里返回的内容，都可以被父组件的REF对象获取到
    return{
      text,
      submit
    }
  })

  console.log(props,ref);//在Demo中，调用Child时候，传递的ref对象(x)
  return <div className="child-box">
    <span ref={ref}>哈哈哈</span>
  </div>
})

const Demo6 = function Demo6(){
  let x = useRef(null)

  useEffect(() => {
    console.log((x.current))
  },[])

  return <div className='demo'>
    {/* 当Child是一个类组件时，是可以取到Child实例的，但是当Child是一个函数组件，就会报错 */}
    {/* 这个时候可以通过React.forwardRef来包裹函数组件 */}
    <Child ref={x}/>
  </div>
}

export default Demo6
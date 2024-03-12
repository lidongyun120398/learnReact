import React,{ useState, useCallback } from 'react';
import { Button } from 'antd'

//@2 更改前
// class Child extends React.Component{
//更改后
// class Child extends React.PureComponent{
//   render(){
//     console.log('Child Render')
//     return <div>
//       我是子组件
//     </div>
//   }
// }

const Child =React.memo(function Child(){
  console.log('Child Render')
      return <div>
        我是子组件
      </div>
}) 

const Demo = function Demo() {
  let [x, setX] = useState(0)

  /* 
    const xxx = useCallback(callback,[依赖])
      + 第一次渲染，useCallback执行，创建一个函数"callback"，赋值给xxx
      + 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给xxx;但是如果，依赖的状态没有更新(或者没有设置依赖"[]"则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来) 
      + 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址(或者说是函数的引用)

    useCallback使用时机:
      + 虽然减少了堆内存的开辟
      + 但是useCallback本身也有自己的处理逻辑和缓存的机制，这个也消耗时间

      + 父组件嵌套子组件，父组件要把内部的一个函数，基于属性传递给，此时传递的这个方法，基于useCallback处理一下会更好:
        + 如代码演示，当父组件更新的时候，因为传递给子组件的属性仅仅是一个函数(特点:基本应该算是不变的)，所以不想再让子组件也跟着更新
        @1 传递给子组件的属性(函数)，每一次需要时相同的堆内存地址,基于useCallback处理
        @2 在组建内部也要做一个处理，验证父组件传递的属性是否发生改变，如果没有变化则让子组件不能更新，有变化才需要更新,
          类组件使用PureComponent就可以实现，函数组件则使用React.memo()将函数组件包裹起来，来对新老传递的属性比较，如果不一致才会把函数组件执行，如果一致，则不让子组件更新
  */

  //@1更改前
  // const handle = useCallback(() => {},[])
  //更改后
  const handle = useCallback(() =>{},[])

  return <div className="vote-box">
    <Child handle={handle}/>
    <div className="main">
      <p>{x}</p>
    </div>
    <div className="footert">
      <Button type="primary" onClick={() => setX(x + 1)}>累加</Button>
    </div>
  </div>
}

export default Demo
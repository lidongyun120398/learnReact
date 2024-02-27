import React,{ useState } from 'react'
import { Button } from 'antd'

/* 
 useState: React Hook函数之一，目的是在函数组件中使用状态，并且基于状态的修改可以让组件更新
  let [num,setNum] = useState(initialValue)
    + 执行useState，传递的initialValue是初始状态值
    + 执行这个方法，返回结果是一个数组：[状态值，修改状态的方法]
      + num存储的是获取的状态值
      + setNum存储的是：修改状态的方法 
    + 执行 setNum(value)
      + 修改状态值为value
      + 通知视图更新
  函数组件[或者Hooks组件]不是类组件，所以没有实例的概念[调用组件不再是创建实例，而是把函数执行，产生一个私有上下文而已]，再所以，在函数组件中不涉及this的处理
*/

const Demo1 = function Demo1(){
  let [ num, setNum ] = useState(0)

  const handle = () => {
    setNum(num + 10);
  }

  return <div className='demo'>
    <span className="num">{ num }</span>
    <Button type='primary' size='small' click={handle}></Button>
  </div>
}

export default Demo1
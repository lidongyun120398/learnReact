import React, { useState } from 'react'
import { Button } from 'antd'



const Demo5 = function Demo5(props){
  //我们需要基于属性传递进来的x和y，相加(或经过其他处理)的结果作为初始值
  // let { x, y } = props,
  //     total = 0;
  // for(let i = x; i < y; i++){
  //   total += +String(Math.random()).substring(2);
  // }
  // let [ num, setNum ] = useState(total)

  //以上的处理方式，每一次函数组件运行时都要执行一次，但是从第二次起total的值就不会影响num了，所以很多无效操作
  //下面这样做的好处在于，传入useState的函数时惰性的，所以在第二次渲染的时候不会再执行该函数了
  let [ num, setNum ] = useState(() => {
    let { x, y } = props,
      total = 0;
    for(let i = x; i < y; i++){
      total += +String(Math.random()).substring(2);
    }
    return total
  })
  

  const handle = () => {
    setNum(1000)
  }

  return <div className='demo'>
    <span className="num">{num}</span>
    
    <Button type='primary' size='small' onClick={handle}>新增</Button>
  </div>
}

export default Demo5
import React, { useState } from 'react'
import { Button } from 'antd'

/*
  在React18中,基于useState创建出来的修改状态的方法，他们的执行也是异步的，原理:等同于类组件中的this.setState
    + 基于异步操作 & 更新队列，实现状态的批处理
  在任何地方修改状态，都是采用异步编程的方式
*/
const Demo3 = function Demo3(){
  console.log('RENDER渲染')
  let [ x, setX ] = useState(10)
  let [ y, setY ] = useState(20)
  let [ z, setZ ] = useState(30)

  const handle = () => {
   setX(x + 1);
   setY(y + 1);
   setZ(z + 1);
  }

  return <div className='demo'>
    <span className="num">x:{x}</span>
    <span className="num">y:{y}</span>
    <span className="num">z:{z}</span>
    <Button type='primary' size='small' onClick={handle}>新增</Button>
  </div>
}

export default Demo3
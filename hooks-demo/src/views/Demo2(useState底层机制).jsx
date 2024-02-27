import React, { useState } from 'react'
import { Button } from 'antd'

/*
  函数组件的每一次渲染(或更新)，都是把函数重新执行，产生一个全新的'私有上下文'
    + 内部的代码都需要重新执行
    + 涉及的函数需要重新的构建{这些函数的作用域(函数执行的上级上下文)，是每一次执行DEMO产生的闭包}
    + 每一次执行DEMO函数，也会把useState重新执行，但是:
      + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值[而不是初始值]
      + 返回的修改状态，每一次都是返回一个最新的
*/

const Demo2 = function Demo2(){
  let [ num, setNum ] = useState(0)

  const handle = () => {
    setNum(num + 10);
  }

  return <div className='demo'>
    <span className="num">{ num }</span>
    <Button type='primary' size='small' onClick={handle}>新增</Button>
  </div>
}

export default Demo2
import React, { useState } from 'react'
import { Button } from 'antd'
import { flushSync } from 'react-dom'

/*
  useState自带了性能优化的机制：
    + 每次修改状态值时，会拿最新要修改的值和之前的状态值作比较(基于Object.is作比较)
    + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新(可以理解为:类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化)
*/
const Demo4 = function Demo4(){
  let [ x, setX ] = useState(10)
  

  const handle = () => {
    //渲染一次，x变成11
  //  for(let i = 0; i < 10; i++){
  //   setX(x + 1)
  //  }

  // for(let i = 0; i < 10; i++){
  //     //渲染2次，11
  //     flushSync(() => {
  //       setX(x + 1)
  //     })
  // }

  // setX(10)

  //让函数只更新一次，但是最后结果是20
  for(let i = 0; i < 10; i++){
        setX(prev => {
          //prev存储上一次的状态值
          return prev + 1
        })
    }
  }

  return <div className='demo'>
    <span className="num">x:{x}</span>
    
    <Button type='primary' size='small' onClick={handle}>新增</Button>
  </div>
}

export default Demo4
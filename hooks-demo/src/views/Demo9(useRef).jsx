import React, { useState, useEffect, useLayoutEffect,useRef } from 'react'
import { Button } from 'antd'

const Demo6 = function Demo6(){
  let [num,setNum] = useState(0);

  /* 
    在hook函数中定义ref的方式
      @1 基于React.createRef()创建一个ref对象来获取想要的内容
      let box = React.createRef()

      return <div className='demo'>
        <span className="num" ref={box}>{num}</span>
    
        <Button type='primary' size='small' onClick={() => { setNum(num + 1) }}>新增</Button>
      </div>

      @2 useRef
      let box = useRef(null)

      return <div className='demo'>
        <span className="num" ref={box}>{num}</span>
    
        <Button type='primary' size='small' onClick={() => { setNum(num + 1) }}>新增</Button>
      </div>

      区别:
        useRef在每一次组件更新的时候(函数重新执行)，再次执行useRef方法的时候，不会创建新的REF对象了，获取到的还是第一次创建的那个REF对象
        createRef在每一次组件更新的时候，都会创建出一个全新的REF对象出来，比较浪费性能
  */
  let box = useRef(null)

  return <div className='demo'>
    <span className="num" ref={box}>{num}</span>
    
    <Button type='primary' size='small' onClick={() => { setNum(num + 1) }}>新增</Button>
  </div>
}

export default Demo6
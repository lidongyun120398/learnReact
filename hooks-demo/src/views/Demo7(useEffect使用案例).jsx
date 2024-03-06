import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

/*
  useEffect:在函数组件中，使用生命周期函数
    useEffect(callback):没设置依赖
      + 第一次渲染完毕后，执行callback，等价于 componentDidMount
      + 在组件每一次更新完毕后，也会执行callback，等价于 componentDidUpdate

    useEffect(callback，[]):设置了，但是无依赖
      + 只有第一次渲染完毕后，才会执行callback，每一次视图更新完毕，callback不再执行，等价于 componentDidMount

    useEffect(callback，[依赖的状态(多个状态)]):
      + 第一次渲染完毕会执行callback
      + 当依赖的状态值(或者多个状态中的一个)发生改变，也会触发callback执行
      + 但是依赖的状态如果没有变化，在组建更新的时候，callback是不会执行的

    useEffect(() => {
      return () => {
        //返回的小函数，会在组件释放的时候执行
        //如果组件更新，会把上一次返回的小函数执行[可以理解为上一次渲染的组件释放了]
      }
    })
*/

const Demo6 = function Demo6(){
  let [num,setNum] = useState(0);

  //需求：当num大于5以后再执行useEffect

  /*
  通过循环会报错，useEffect必须在函数的最外层上下文中调用，不能把其嵌入到条件判断，循环等操作语句中
   if(num > 5){
     useEffect(() => {
       console.log('OK')
     })
   }
  */
   const queryData = () => {}


   useEffect(() => {
    if(num > 5){
      console.log('OK')
    }
  })


  //第一次渲染完毕后，从服务器异步获取数据
  /* 
    useEffect如果设置返回值，则返回值必须是一个函数(代表组件销毁时触发)；
    下面案例中，callback经过async的修饰，返回的时一个promise实例，不符合要求
  useEffect(async () => {
    let data = await queryData()
    console.log('成功:',data)
  },[]) 
  */

  //解决方法1：不使用async
  useEffect(() => {
    queryData()
      .then(data => {
        console.log('成功:',data)
      })
  })

  //解决方法2：在内部定义，在内部调用
  useEffect(() => {
    const next = async () => {
      let data = await queryData()
      console.log('成功:',data)
    }
    next()
  })
      

  const handle = () => {
    setNum(num + 1)
  }

  return <div className='demo'>
    <span className="num">0</span>
    
    <Button type='primary' size='small' onClick={handle}>新增</Button>
  </div>
}

export default Demo6
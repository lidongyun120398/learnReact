import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'antd'


/* 
  视图更新的步骤:
    @1 基于babel-preset-react-app把JSX编译为createElement格式
    @2 把createElement执行，创建出virtualDOM
    @3 基于root.render方法把virtualDOM变为真实DOM对象(DOM-DIFF)
      useLayoutEffect会阻塞第四步操作，先去执行Effect链表中的方法(同步操作)
      useEffect第四步操作和Effect链表中的方法执行，是同时进行的(异步操作)
    @4 浏览器渲染和绘制真实DOM对象



  如果链表中callback执行又修改了状态值(视图更新)：
    + 对于useEffect来讲，第一次真实DOM已经渲染，组件更新会重新渲染真实的DOM；所以频繁切换的时候，会出现样式/内容闪烁
    + 对于useLayoutEffect来讲：第一次真实DOM已经创建但是还未渲染，遇到callback中修改了状态，视图立即更新，创建出新的virtualDOM，然后和上一次的virtualDOM合并在一起渲染为真是DOM，
      也就是在此类需求下，真是DOM只渲染一次，不会出现内容/样式的闪烁


    + useLayoutEffect会阻止浏览器渲染真实DOM，优先执行Effect链表中的callback
    + useEffect不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback；


      useLayoutEffect设置的callback要优先于useEffect去执行
      在两者设置的callback中，依然可以获取DOM元素(原因：真实DOM对象已经创建了，区别只是浏览器是否渲染)
      

      如果在callback函数中又修改了状态值(视图又要更新)
      + useEffect：浏览器肯定是把第一次的真实DOM已经绘制了，再去渲染第二次真实DOM
      + useLayoutEffect: 浏览器是把两次真实DOM的渲染，合并在一起渲染的
*/

const queryData = () => {}

const Demo6 = function Demo6(){
  let [num,setNum] = useState(0);

  // useEffect(() => {
  //   if(num === 0){
  //     setNum(10)
  //   }
  // },[num])

  useLayoutEffect(() => {
    if(num === 0){
      setNum(10)
    }
  },[num])

  return <div className='demo'>
    <span className="num" 
          style={{
            color: num === 0 ? 'red' : 'green'
          }}>
            {num}
    </span>
    
    <Button type='primary' size='small' onClick={() => { setNum(0) }}>新增</Button>
  </div>
}

export default Demo6
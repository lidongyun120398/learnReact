import React, { useState,useMemo } from 'react';
import { Button } from 'antd';

const Demo = function Demo() {
  let [supNum,setSupNum] = useState(10),
      [oppNum,setOppNum] = useState(5),
      [x,setX] = useState(0)
  /*
    下面这段运算的代码，函数组件的每次更新都是把函数重新执行 
    +  产生一个新的闭包
    + 内部的代码也要重新执行一遍

    let total = supNum + oppNum,
      radio = '__';
    if(total > 0) radio = (supNum / total * 100).toFixed + '%'

    如果我么修改的是支持数/反对数，视图更新的时候，我们可以让此逻辑重新计算

    但是如果我们是修改其他状态值，视图更新，此逻辑没必要再重新执行(如果此逻辑需要执行时间比较长，一定是影响视图更新速度的)

    所以再函数每一次重新执行的时候，如果依赖的状态值没有发生变化，我们此操作逻辑不应该执行，只有依赖值发生改变，我们再去执行即可

    那么这个问题可以使用useMemo来解决

    let xxx = useMemo(callback, [依赖项])
      + 第一次渲染组件的时候，callback会执行
      + 后期只有依赖的状态值发生改变，callback才会再执行
      + 每一次会把callback执行的返回结果赋值给xxx
      + use Memo具备缓存效果，在依赖的状态值没有发生改变，callback没有触发执行的时候，xxx获取的是上一次计算出来的结果“计算缓存”

    useMemo是一个优化的Hook函数
      + 如果函数组件中，有消耗性能和时间的计算操作，则尽可能用useMemo缓存起来；设置对应的依赖
      + 这样可以保证，当非依赖状态发生改变，不会去处理一些没必要的操作，提高组件更新的速度
  */

    let radio = useMemo(() => {
      let total = supNum + oppNum,
          radio = '__';
      if(total > 0) radio = (supNum / total * 100).toFixed + '%'
      return radio
    },[supNum, oppNum])
  

  return <div className="vote-box">
    <div className="main">
      <p>支持人数:{supNum}人</p>
      <p>反对人数:{oppNum}人</p>
      <p>支持比率:{radio}</p>
    </div>
    <div className="footer">
      <Button type="primary" onClick={() => setSupNum(supNum + 1)}>支持</Button>
      <Button type="primary" danger onClick={() => setOppNum(oppNum + 1)}>反对</Button>
      <Button onClick={() => setX(x + 1)}>干点别的事</Button>
    </div>
  </div>
}

export default Demo
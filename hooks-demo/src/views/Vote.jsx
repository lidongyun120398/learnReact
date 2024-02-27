import React, { useState } from 'react';
import { Button } from 'antd';
import './Vote.less';

/*
  执行一次useState：把需要的状态信息都放在对象中统一管理
    + 执行setState方法的时候，更新的是整个对象，传递的是啥值，就把状态整体改完啥值
    + setState({ supNum:state.supNum + 1 })单独修改supNum的值，oppNum的值就丢失了，不会像setState一样支持部分状态更新

  官方建议:需要多个状态，就把useState执行多次即可
*/

const Vote = function Vote(props){
  let { title } = props
  // let [ state, setState ] = useState({
  //   supNum: 10,
  //   oppNum: 5
  // })

  let [ supNum, setSupNum ] = useState(10),
      [ oppNum, setOppNum ] = useState(5);

  const handle = (type) => {
    if(type === 'sup'){
      setSupNum(supNum + 1) 
      return 
    }
    setOppNum(oppNum + 1)
  }

    return <div className="vote-box">
      <div className="header">
        <h2 className="title">
          {title}
        </h2>
        <span>{supNum + oppNum}人</span>
      </div>
      <div className="main">
        <p>支持人数:{supNum}人</p>
        <p>反对人数:{oppNum}人</p>
      </div>
      <div className="footer">
        <Button type='primary' onClick={handle.bind(null,'sup')}>支持</Button>
        <Button type='primary' danger onClick={handle.bind(null,'opp')}>反对</Button>
      </div>
    </div>
}

export default Vote
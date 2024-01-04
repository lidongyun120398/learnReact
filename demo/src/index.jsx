// 对es6内置API做兼容处理
// 脚手架内部提供了react-app-polyfill

import React from 'react';//react语法核心
import ReactDOM from 'react-dom/client';//构建HTML(WebApp)核心

//获取页面中#app的容器，作为“根”容器
//在ReactDOM.createRoot()的时候，不能直接把HTML/BODY做为根容器，需要指定一个额外的盒子，例如#root
const root = ReactDOM.createRoot(document.getElementById('root'));

class Count extends React.Component{
  state = { num: 0 }
  render(){
    let { num } = this.state;
    return <>
    {/* 每一个构建的视图，只能有一个根节点 所以React提供了一个特殊的标签：React.Fragment <></> 空文档标记标签 */}
    {/* 既保证了只有一个根节点，又不会新增一个HTML层级结构 */}
    <span>{ num }</span>
    <br />
    <button onClick={() => {
      num++;
      this.setState({
        num
      })
    }}>
      增加
    </button>
    </>
  }
}

//计入render方法渲染我们编写的视图，把渲染后的内容，全部插入到#root中进行渲染
root.render(
 <Count />
);


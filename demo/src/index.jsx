// 对es6内置API做兼容处理
// 脚手架内部提供了react-app-polyfill

import React from 'react';//react语法核心
import ReactDOM from 'react-dom/client';//构建HTML(WebApp)核心
// import DemoOne from '@/views/DemoOne';
// import Dialog from "@/components/Dialog"
// import Vote from './views/newVote';
// import Demo from "./views/Demo2"
// import Demo from "./views/Demo3"
import Demo from "./views/Demo4"

//获取页面中#app的容器，作为“根”容器
//在ReactDOM.createRoot()的时候，不能直接把HTML/BODY做为根容器，需要指定一个额外的盒子，例如#root
const root = ReactDOM.createRoot(document.getElementById('root'));

// class Count extends React.Component{
//   state = { num: 0 }
//   render(){
//     let { num } = this.state;
//     let flag = true
//     let isRun = true

//     let data = [{
//       id:1,
//       title:"rush A"
//     },{
//       id:2,
//       title:"rush B"
//     },{
//       id:3,
//       title:"rush C"
//     }]
//     return <>
//     {/* 每一个构建的视图，只能有一个根节点 所以React提供了一个特殊的标签：React.Fragment <></> 空文档标记标签 */}
//     {/* 既保证了只有一个根节点，又不会新增一个HTML层级结构 */}
//     <span>{ num }</span>
//     <br />
//     <button onClick={() => {
//       num++;
//       this.setState({
//         num
//       })
//     }}>
//       增加
//     </button>

//     {/* 基于flag来渲染元素的两种方式 */}
//     {/* 第一种控制元素的display来控制元素是否显示，但是元素仍会渲染 */}
//     <button style={{display:flag ? "block" : "none"}}>button1</button>

//     {/* 第二种可以在flag为false时直接不渲染该标签，可以直接控制元素渲染或者不渲染 */}
//     {!flag ? <button>button2</button> : null}

//     <button>{isRun ? "正在处理中..." : "立即提交注册"}</button>



//     {/* 数组循环展示 */}

//     <h2>去哪里</h2>
//     <ul className="news-box">
//       {data.map((item,index) => {
//         return <li key={item.id}>
//           <em>{ index + 1}</em>
//           &nbsp;&nbsp;
//           <span>{item.title}</span>
//         </li>
//       })}
//     </ul>
    
//     <br />

//     {/* 拓展需求：没有数组单独循环 */}
//     {/* forEach和map不会迭代稀疏数组 */}

//     {new Array(5).fill(null).map((_,index) => {
//       return <button key={index}>
//         按钮{index + 1}
//         </button>
//     })}


//     {/* {}胡子语法中不能输入对象，但是可以通过React.createElement()来创建一个对象(虚拟DOM对象)放在里面 */}

//     {React.createElement("button",null,"提交")}
//     </>
//   } 
// }

// // console.log(React.createElement("button",null,"提交"))

// //计入render方法渲染我们编写的视图，把渲染后的内容，全部插入到#root中进行渲染
// root.render(
//   <>
//   <Count />
//   {/* 如果设置的属性值不是字符串格式，需要基于{}胡子语法嵌套 */}
//   {/* 在这里写的这些属性可以在DemonOne函数中通过props接收到 */}
//   {/* 使用双闭合标签时，还可以在标签中加一些其他的信息，通过children传递给DemonOne */}
//   <DemoOne title="我是标题" x={10} data={[10,20]} className="box" style={{fontSize:"20px"}}>
//     <span slot="footer">1111</span>
//     <span slot="header">2222</span>
//   </DemoOne>
//   </>
// );

// root.render(
//   <>
//   <Dialog title="友情提示" content="大家出门做好个人防护"/>

//   <Dialog content="我们一定要好好学React">
//     <button>确定</button>
//     <button>很确定</button>
//   </Dialog>
//   </>
// )

/* 
  父子组件渲染流程(深度优先原则)：遇到子组件，一定是把子组件处理完，父组件才能继续处理
    + 父组件第一次渲染
      父willMount -> 父render(子willMount -> 子render -> 子didMount) -> 父didMount
    + 父组件更新
      父shouldUpdate -> 父willUpdate -> 父render(子shouldUpdate -> 子willUpdate -> 子render -> 子didUpdate) -> 父didUpdate
    + 父组件销毁
      父willUnmount -> 处理中(子willUnmont -> 子销毁) -> 父销毁
*/ 
// root.render(
//   <>
//     <Vote title="React还是很好学的"/>
//   </>
// )

root.render(
  <>
    <Demo />
  </>
)
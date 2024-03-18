import React from 'react'
import Nav from './views/Nav'
import Menu from './views/Menu'

/* 
  解决样式冲突，实现样式私有化的五种方案:
  @1 内联式样式：将所有样式写成行内样式，每个组件的样式不再基于样式类名处理
    缺点:
      + 不利于样式的复用，如果提取为一个通用样式对象，则没有代码提示
      + 不能使用伪类
      + 编译后的样式和结构混淆在一起，不利于优化
  @2 基于样式表，样式类名这样的方式，但是需要人为有意识的，有规范的 规范样式冲突问题
      + 首先保证每个组件最外层样式类名时不冲突的
      命名方案:路径+组件名 作为组件外层容器的名字
      + 后期组件内部的元素，其样式，都基于less/sass/stylus嵌入到指定的外层容器的样式类名之下去编写
  @3 cssModule:
      引入写好的module文件:import sty from './xxx.module.css'(这样的文件是css文件，不能再使用less/sass/stylus这样的预编译语言)
      此时sty存储的是一个对象，包含多组键值对
        +键：在module.css中编写的样式类名 .box{}
        +值：经过webpack编译后的样式类名 
      从里面取出对应变量赋值给对应元素的className  <div className={sty.box}></div>

      如果有多个类要添加给一个元素，则使用模板字符串来拼接多个类

      在某个样式前面加上:global()可以不编译这个类名，那么这个类里面的样式就变成了全局样式

      .link{
        composes:list
      }
      这样写会继承list类里面所有的样式
  @4 ReactJSS
      基于createUseStyles方法，构建组件需要的样式;返回结果是一个自定义Hook函数
        + 对象中的每个成员就是创建的样式类名
        + 可以类似于less等预编译语言中的"嵌套语法",给其后代或者伪类等设置样式
      自定义Hook执行，返回一个对象，对象中包括:
        + 我们创建的样式类名，作为属性名
        + 编译后的样式类名(唯一的)，作为属性值
      而我们在js中编写的样式，最终会编译为以编译后的样式类名为键，样式对象为值的html代码
      import { createUseStyles } from 'react-jss'

      const useStyles = createUseStyles({
        //box是类名
        box:{
          backgrounColor:'lightblue'
          '&:hover':{
            color:green
          }
          '& a':{// list a{}

          }
        }
      })

      在函数组件中：
      let { box } = useStyles()
      拿到box类，给对应的HTML元素加上className={box}

      相对于CSSModules的好处:因为样式是写在JS中的，我们就可以基于一些逻辑操作，实现样式的动态管理
      let { box } = useStyles({
        size:14,
        color:green
      })

      const useStyles = createUseStyles({
        //box是类名
        box:{
          backgrounColor:'lightblue'
          '&:hover':{
            color:props = props.color
          }
          list:props => {//这个函数只能给list加，不能给内部的'& a'加
            return {
              '& a':{
                fontSize:props.size + 'px',
                color:'#000'
              }
            }
          }
        }
      })



      ReactJSS不能直接作用于Component组件中，但是可以创建一个包装器(代理组件：函数组件)，获取我们基于ReactJSS编写的样式，把获取的样式基于属性传递给类组件
      代码见Menu.jsx
*/

const App = function App(){
  return <div className="home-box">
    <Nav />
    <Menu />
    <div className="box"></div>
  </div>
}

export default App
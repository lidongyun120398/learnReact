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
*/

const App = function App(){
  return <div className="home-box">
    <Nav />
    <Menu />
    <div className="box"></div>
  </div>
}

export default App
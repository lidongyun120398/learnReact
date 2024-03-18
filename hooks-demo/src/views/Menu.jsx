import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  box:{
    backgroundColor:'lightpink',
    width:'400px'
  },
  list:{
    '& li':{
      lineHeight:'30px',
      '&:hover':{
        color:'red'
      }
    }
  }
})

class Menu extends React.Component{

}

const ProxyComponent = function ProxyComponent(Component){
  //Component：真实要渲染的组件
  //方法执行要返回一个函数组件，我们基于export default到处的是这个组件
  return function HOC(props){
    // let { box,list } = useStyles()
    let sty = useStyles()
    // return <Component {...props} box={box} list={list}/>
    return <Component {...props} {...sty}/>
  }
}

export default ProxyComponent(Menu)
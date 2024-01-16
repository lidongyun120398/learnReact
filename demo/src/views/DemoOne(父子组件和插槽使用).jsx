import PropTypes from 'prop-types'
import React from "react"

const DemoOne = function DemoOne(props){
  // 接收使用DemoOne的地方传入的属性
  //props传递过来的属性是只读的(被冻结)
  let { title, x, children } = props

  //产生需求，如果有多个children元素传入进来，想要只有一个显示在上，两个一个在上一个在下，但是又会碰到不是数组的情况，所以需要自己单独处理
  // if(!children){
  //   children = []
  // }else if(!Array.isArray(children)){
  //   children = [children]
  // }

  //同时react也针对以上这种情况提供了方法，基于 React.Children 对象中提供的方法，对props.children做处理：count/forEach/map/toArray...
  //好处：在这些方法内部对children的各种形式做了处理
  children = React.Children.toArray(children)
  //处理具名插槽
  let headerSlot = [],
      footerSlot = [],
      defaultSlot = [];
  children.forEach(child => {
    //传递进来的插槽信息都是编译为virtualDom后传递进来的，而不是传递标签
    let { slot } = child.props
    if(slot === "header"){
      headerSlot.push(child)
    }else if(slot === "footer"){
      footerSlot.push(child)
    }else{
      defaultSlot.push(child)
    }
  })

  return <div className="demo-box">
    {/* {children[0]} */}
    {headerSlot}
    <h2 className="title">{title}</h2>
    <span>{x}</span>
    <br />
    {/* 相当于默认插槽 */}
    {footerSlot}
    {/* {children[1]} */}
  </div>
}
// 通过把函数当成对象,设置静态的私有属性方法,来给其设置属性的规则
DemoOne.defaultProps = {
  x: 0
};
//设置其他规则,例如数据格式,是否必传,依赖于官方插件prop-types
DemoOne.propType = {
  title:PropTypes.string.isRequired,
  x:PropTypes.number
}





//对象的规则设置：冻结，密封，不可拓展

// Object.freeze(obj)冻结对象，冻结后不可新增修改删除，通过Object.isFrozen(obj)可以检测该对象是否被冻结，不能通过Object.defineProperty()来给对象做劫持

// Object.seal(obj)密封对象,Object.isSealed(obj)检测密封,被密封后不可删除新增,但是可以修改,也不可以做劫持

//Object.preventExtensions(obj)使当前对象变为不可扩展,Object.isExtensible(obj)检测是否不可扩展,可修改删除劫持,但是不可新增

export default DemoOne
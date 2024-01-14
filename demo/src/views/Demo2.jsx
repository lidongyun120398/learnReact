import React from "react"

/*
  PureComponent 和 Component 的区别:
    PureComponent会默认给类组件加一个shouldComponentUpdate周期函数
      + 再次周期函数中，会对新老的的属性/状态，会做一个浅比较
      + 如果经过浅比较，发现属性和状态并没有改变，则会返回false(也就是不继续更新组件)，有变化才会去更新
*/

const isObject = function isObject(obj){
  // return obj !== null && typeof obj === "object"
  return obj !== null && /^(object|function)$/.test(typeof obj)
}

//浅比较两个对象
const shallowEqual = function shallowEqual(objA,objB){
  if(!isObject(objA) || !isObject(objB)) return false
  if(objA === objB) return true
  //先比较成员数量
  let keysA = Reflect.ownKeys(objA)
  let keysB = Reflect.ownKeys(objB)
  if(keysA.length !== keysB.length) return false
  //数量一致再逐一比较内部成员，且只比较第一级
  for(let i = 0; i < keysA.length; i++){
    let key = keysA[i];
    //如果一个对象中有该成员，但是另外一个对象没有，或都有该成员，但是成员值不一致，都应该判定为不相同
    if(!objB.hasOwnPropperty(key) || !Object.is(objA[key],objB[key])) return false
  }
  //以上都处理完，发现没有不相等的
  return true;
}

class Demo extends React.PureComponent{
  state = {
    arr: [10, 20, 30]
  } 

  render(){
    let { arr } = this.state
    return <div>
      {arr.map((item,index) => {
        return <p key={index} style={{
          display:'inline-block',
          width:100,
          height:100,
          backgroundColor:"pink",
          marginRight:10
        }}>
          {item}
          </p>
      })}
      <br />
      <button onClick={() => {
        arr.push(arr[arr.length - 1] + 10)
        // this.setState({ arr }) //因为arr的栈地址没变，所以在shouldComponentUpdate中判断前后一致，不会变化
        //想要更新的办法
        //1. this.forceUpdate();
        //2.
        this.setState({
          arr: [...arr] //浅拷贝，改变了arr的栈地址
        })
      }}>
        新增
      </button>
    </div>
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   //props/state:修改前的属性状态
  //   //nextProps/nextState:将要修改的属性状态
  // }
}

export default Demo
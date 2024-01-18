import React from "react"

/*
  React中合成事件的处理原理：
    @1 绝对不是给当前元素基于addEventListener单独做的事件绑定，React中的合成事件，都是基于事件委托处理的
      + 在React17及以后版本，都是委托给root容器(捕获和冒泡都做了委托)
      + 在17以前都是委托给document容器(而且只做了冒泡阶段的委托)
      + 对于没有实现事件传播机制的事件，才单独做的事件绑定
    @2 在组件渲染的时候，如果发现JSX元素属性中有onXXX/onXXXCapture这样的属性，不会给当前元素直接做事件绑定，只是把绑定的方法赋值给元素的相关属性
    @3 然后对#root这个容器做了事件绑定
      + 原因:因为组件中所渲染的内容，最后都会插入到#root容器中，这样点击页面中的任何一个元素，最后都会把root的点击行为触发
      + 而在给#root绑定的方法中，把之前给元素设置的onXXX/onXXXCapture属性，在相应的阶段执行

  在React16中，关于合成事件对象的处理，React内部是基于"事件对象池"，做了一个缓存机制。React17之后，是去掉了这套事件对象池和缓存机制
    + 当每一次事件触发的时候，如果传播到了委托的元素上，在委托方法中，我们首先会对内置事件对象做统一处理，生成合成事件对象
    + 在React16中为了防止每一次都是重新创建出新的合成事件对象，它设置了一个事件对象池(缓存池)，本次事件触发，获取到事件操作的相关信息，我们从事件对象池中获取存储
      的合成事件对象，把信息赋值给相关的成员
    + 等待本次操作结束，把合成事件对象中的成员信息都清空掉，再放入到事件对象池中
*/

class Demo extends React.Component{
  render(){
    return <div className="outer"
              onClick={() => {
                console.log("outer 冒泡")
              }}
              onClickCapture={()=> {
                console.log("outer 捕获")
              }}
            >
              <div className="inner" 
                onClick={(ev) => {
                  //ev合成事件对象
                  console.log("inner 冒泡")
                  // ev.stopPropagation() //合成事件中的阻止事件传播：既可以阻止原生的事件传播，也可以合成事件中的事件传播
                  ev.nativeEvent.stopPropagation()//原生事件中的阻止事件传播：只能阻止原生事件的传播
                  ev.nativeEvent.stopImmediatePropagation()//原生事件对象的阻止事件传播，只不过可以阻止#root上其他绑定的方法执行
                }}
                onClickCapture={()=> {
                  console.log("inner 捕获")
                }}
            ></div>
          </div>
  } 

  componentDidMount(){
    document.body.addEventListener("click",() => {
      console.log('body 捕获')
    },true)

    document.body.addEventListener("click",() => {
      console.log('body 冒泡')
    })

    //这里打印root的捕获/冒泡晚于inner和outer的原因是因为root的监听是在didMount里面做的，晚于上面方法的绑定，按照执行顺序在后面，所以后执行
    let root = document.querySelector("#root")
    root.addEventListener("click",() => {
      console.log('root 捕获')
    },true)
    root.addEventListener("click",() => {
      console.log('root 冒泡')
    })
  }
}

export default Demo
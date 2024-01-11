/*创建类组件
    创建一个构造函数(类)
    要求必须继承React.Component/PureComponent这个类
    必须给当前类设置一个render方法，放在其原型上,在render方法中，返回我们需要渲染的视图

  从调用类组件(new Vote())开始，类组件内部发生的事情：
    1.初始化属性 && 规则校验
    + 先规则校验，校验完毕后，再处理属性的其他操作
    方案一：
      constructor(props){
        super(props);//会把传递进来的属性挂载到this实例上
      }
    方案二：即便我们自己不在constructor中处理(或者constructor不写)，在constructor处理完毕后，React内部也会把传递的props挂载到实例上，
          所以在其他函数中，只要保证this是实例，就可以基于this.props获取到传递的属性
          同样this.props获取到的属性对象也是被冻结的

    + 设置规则校验：
      static defaultProps = {
        num: 0
      }
      static propTypes = {
        num: PropType.number
      }


    2.初始化状态
      + 状态：后期修改状态，可以触发视图的更新
          + 需要手动初始化，如果没有做相关的处理，则默认会在实例上挂载一个state，初始值是null
      + 修改状态，让视图更新，this.state.xxx = xxx,这样只是修改了state的数据，没有办法让视图更新
      + 想让视图更新，需要基于React.Component.prototype提供的方法操作：
       @1 this.setState(partialState),(partialState部分状态)，既可以修改状态，也可以让视图更新
       @2 this.forceUpdate() 强制更新(不推荐)

    3.执行相关的周期函数 触发componentWillMount周期函数(钩子函数),执行在组件第一次渲染之前
      + 钩子函数：在程序运行到某个阶段，我们可以提供一个处理函数，让开发者在这个阶段做一些自定义的事情
      + 此周期函数，目前是不安全的(虽然可以用，但是未来可能移除，所以不建议使用)
        + 控制台会抛出黄色警告，为了不抛出警告，可以使用UNSAFE_componentWillMount
      + 如果开启了React.StrictMode(React的严格模式)，则我们使用UNSAFE_componentWillMount 这样的周期函数，控制台会直接抛出红色警告错误

      React.StrictMode VS "use strict"
      + "use strict": JS的严格模式
        fn.call(null):非严格模式下会是window，如果是严格模式下就是null
      + React.StrictMode：React的严格模式，会检查React中一些不规范语法，或者是一些不建议使用的API等

    4.触发 render 周期函数：渲染

    5.触发 componentDidMount：第一次渲染完毕
      +已经把virtualDOM转换为真实DOM元素了，所以可以获取真实DOM
  
  组件更新逻辑(当修改了相关状态，组件会更新)
      1.触发 shouldComponentUpdate 周期函数：是否允许更新
      2.触发 componentWillUpdate 周期函数: 更新之前
        + 此周期函数也是不安全的
        + 在这个阶段状态也还没有修改
      3.修改状态值/属性值 (让this.state.xxx改为最新的值)
      4.触发 render 周期函数： 组件更新
        + 按照最新的状态/属性，把返回的JSX编译为virtualDOM
        + 和第一次渲染出来的virtualDOM进行对比(DOM-DIFF)
        + 把差异的部分进行渲染(渲染为真实DOM)
      5.触发 componentDidUpdate 周期函数: 组件更新完毕
      特殊说明： 如果我们是基于this.forceUpdate(),则会跳过shouldComponentUpdate的周期函数的校验，直接从componentWillUpdate开始更新，也就是视图一定会触发更新
*/

import React,{ Component } from "react";
import PropTypes from "prop-types"

class Vote extends Component {
  static defaultProps = {
    num: 0
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  }

  //初始化状态
  state = {
    supNum: 10,
    oppNum: 5
  }


  // constructor(props){
  //   super(props);//会把传递进来的属性挂载到this实例上
  // }


  render(){
    let { title } = this.props,
        { supNum, oppNum  } = this.state

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
      <button onClick={() => {
        this.setState({
          supNum:supNum + 1
        })
      }}>支持</button>
      <button onClick={() => {
        // this.setState({
        //   oppNum:oppNum + 1
        // })
        oppNum++;
        this.forceUpdate();
      }}>反对</button>
    </div>
  </div>
  }

  UNSAFE_componentWillMount(){
    console.log('componentWillMount:',"第一次渲染之前")
  }

  componentDidMount(){
    console.log('componentDidMount:',"第一次渲染完毕")
  }

  shouldComponentUpdate(nextProps,nextState){
    //nextState存储要修改的最新状态，this.state存储修改前的状态，此时状态还没有改变
    console.log("shouldComponentUpdate:",this.state,nextState)

    //此周期函数需要返回true/false，返回true是允许更新，继续下一个操作
    //返回false，不允许更新，接下来啥都不处理
    return true;
  }

  UNSAFE_componentWillUpdate(nextProps,nextState){
    console.log("UNSAFE_componentWillUpdate:",this.state,nextState)
  }

  componentDidUpdate(){
    console.log("componentDidUpdate:","组件更新完毕")
  }
}
export default Vote
/*创建类组件
    创建一个构造函数(类)
    要求必须继承React.Component/PureComponent这个类
    必须给当前类设置一个render方法，放在其原型上,在render方法中，返回我们需要渲染的视图

  从调用类组件(new Vote())开始，类组件内部发生的事情：
    1.初始化属性 && 规则校验
    先规则校验，校验完毕后，再处理属性的其他操作
    方案一：
      constructor(props){
        super(props);//会把传递进来的属性挂载到this实例上
      }
    方案二：即便我们自己不在constructor中处理(或者constructor不写)，在constructor处理完毕后，React内部也会把传递的props挂载到实例上，
          所以在其他函数中，只要保证this是实例，就可以基于this.props获取到传递的属性
          同样this.props获取到的属性对象也是被冻结的

    设置规则校验：
      static defaultProps = {
        num: 0
      }
      static propTypes = {
        num: PropType.number
      }
*/

import React,{ Component } from "react";
import PropTypes from "prop-types"

class Vote extends Component {
  // constructor(props){
  //   super(props);//会把传递进来的属性挂载到this实例上
  // }

  static defaultProps = {
    num: 0
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  }


  render(){
    let { title } = this.props
    let supNum = 10,
        oppNum = 5


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
        supNum++
      }}>支持</button>
      <button onClick={() => {
        oppNum++
      }}>反对</button>
    </div>
  </div>
  }
}
export default Vote